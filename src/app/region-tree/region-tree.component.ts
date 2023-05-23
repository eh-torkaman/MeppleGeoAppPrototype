import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FlatTreeControl } from '@angular/cdk/tree';
import * as turf from '@turf/turf';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';
import {
  CollectionViewer,
  SelectionChange,
  SelectionModel,
} from '@angular/cdk/collections';
import { BehaviorSubject, debounceTime, filter, tap } from 'rxjs';
import * as mapSelectors from '../state/map.selectors';
import {
  NeighborhoodsCollection,
  NeighborhoodsFeature,
  NeighborhoodsFeatureProperties,
} from '../geojson.interfaces/Neighborhoods';
import { MultiPolygon, Polygon, Position } from 'geojson';
import { InitialFilteredViewPolygonCoordinates } from '../utils/const';
import { MapSettingActions } from '../state/map.actions';

type NTree = NeighborhoodsFeature<
  MultiPolygon | Polygon,
  NeighborhoodsFeatureProperties
>;
/**
 * Node for to-do item
 */
export class RegionNode<T = NTree> {
  children?: RegionNode[];
  item!: string;
  feature!: T;
  ZoneId: number = -1;
}

/** Flat to-do item node with expandable and level information */
export class RegionFlatNode<T = NTree> {
  item!: string;
  level!: number;
  expandable!: boolean;
  feature!: T;
  ZoneId!: number;
}

class ChecklistDatabase {
  dataChange = new BehaviorSubject<RegionNode[]>([]);

  get data(): RegionNode[] {
    return this.dataChange.value;
  }

  constructor(treeData: NTree[]) {
    let rootNode = new RegionNode();
    rootNode.item = 'All Regions';
    rootNode.feature = turf.polygon(
      InitialFilteredViewPolygonCoordinates
    ) as NTree;

    //console.log(rootNode.feature);
    rootNode.children = this.buildTree(treeData, 0, rootNode.ZoneId);
    // Notify the change.
    this.dataChange.next([rootNode]);
    //console.log('rootNoderootNoderootNoderootNode', rootNode);
  }

  buildTree(
    neighborhoodsFeatures: NTree[],
    level: number,
    parentId: number
  ): RegionNode[] | undefined {
    let newNfs = neighborhoodsFeatures;
    // console.log('build tree: level',level,' parentId ',parentId)
    return newNfs.map((node) => {
      let newNode = new RegionNode();
      newNode.ZoneId = node.properties.ID;
      newNode.item = node.properties.NAME + '( ' + node.properties.area + ' )';

      newNode.feature = node;
      return newNode;
    });
  }
}

/**
 * @title Tree with checkboxes
 */
@Component({
  selector: 'app-region-tree',
  templateUrl: './region-tree.component.html',
  styleUrls: ['./region-tree.component.scss'],
})
export class RegionTreeComponent implements OnInit {
  Neighborhoods$ = this.store
    .select(mapSelectors.selectNeighborhoods_NoFilter)
    .pipe(filter((it) => !!it));

  ngOnInit(): void {
    this.Neighborhoods$.subscribe((neighborhoods) => {
      if (neighborhoods?.features)
        this._database = new ChecklistDatabase(neighborhoods.features);

      this.dataSource.data = this._database.data;

      let rootN = this.nestedNodeMap.get(this.dataSource.data[0]);
      if (rootN) 
       { this.descendantsAllSelected(rootN);
      this.todoItemSelectionToggle(rootN)}
    });

    this.checklistSelection.changed
      .pipe(
        debounceTime(1000)
      )
      .subscribe((rs) => {
        console.log(this.checklistSelection.selected);

        let polygons0 = this.checklistSelection.selected
          .map((it) => it.feature)
          .sort((a, b) => b.properties.area - a.properties.area);

        let polygons: MultiPolygon[] = polygons0.map((it) =>
          it.geometry.type == 'MultiPolygon'
            ? it.geometry
            : turf.multiPolygon([it.geometry.coordinates]).geometry
        );

        let multipolygon: MultiPolygon =
          polygons.length == 0
            ? turf.multiPolygon([InitialFilteredViewPolygonCoordinates])
                .geometry
            : polygons[0];

        multipolygon = JSON.parse(JSON.stringify(multipolygon));

        if (polygons.length >= 2) {
          polygons.forEach((pl) => {
            multipolygon.coordinates.push(pl.coordinates[0]);
          });
        }

        this.store.dispatch(
          MapSettingActions.setFilterMultipolygon({ multipolygon })
        );
      });
  }
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<RegionFlatNode, RegionNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<RegionNode, RegionFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: RegionFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<RegionFlatNode>;

  treeFlattener: MatTreeFlattener<RegionNode, RegionFlatNode>;

  dataSource: MatTreeFlatDataSource<RegionNode, RegionFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<RegionFlatNode>(true /* multiple */);
  private _database!: ChecklistDatabase;
  constructor(private store: Store) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<RegionFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
  }

  getLevel = (node: RegionFlatNode) => node.level;

  isExpandable = (node: RegionFlatNode) => node.expandable;

  getChildren = (node: RegionNode): RegionNode[] | undefined => node.children;

  hasChild = (_: number, _nodeData: RegionFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: RegionFlatNode) =>
    _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: RegionNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item
        ? existingNode
        : new RegionFlatNode();
    flatNode.item = node.item;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    flatNode.feature = node.feature;
    flatNode.ZoneId = node.ZoneId;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: RegionFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: RegionFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: RegionFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: RegionFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: RegionFlatNode): void {
    let parent: RegionFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: RegionFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: RegionFlatNode): RegionFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
}
