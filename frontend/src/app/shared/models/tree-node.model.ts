import { TreeNode } from 'primeng';

export interface TreeNodeModel<T> extends TreeNode {
	data?: T;
	children?: TreeNodeModel<T>[];
	parent?: TreeNodeModel<T>;
}
