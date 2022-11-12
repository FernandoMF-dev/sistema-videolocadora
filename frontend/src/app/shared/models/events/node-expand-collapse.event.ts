import { TreeNodeModel } from '../tree-node.model';

export interface NodeExpandEvent<T> {
	originalEvent: PointerEvent;
	node: TreeNodeModel<T>;
}

export interface NodeCollapseEvent<T> {
	originalEvent: PointerEvent;
	node: TreeNodeModel<T>;
}
