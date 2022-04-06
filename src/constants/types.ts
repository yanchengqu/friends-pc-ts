// import { ResolverModels } from 'dva-type';
// export type State = ResolverModels<Models>['state'];
// export type Actions = ResolverModels<Models>['actions'];
// const dispatch = useDispatch<(action: Actions) => any>();
import { Dispatch } from 'redux';

export interface IDvaProps {
  readonly dispatch?: Dispatch<any>;
}
