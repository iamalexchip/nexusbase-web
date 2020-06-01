import * as path from "path";
import HookService from '../services/HookService';

export const storagePath = path.join(__dirname, '..', '..', 'storage');// todo: change path based on env
export const hooks = HookService;
