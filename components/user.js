import Gun from 'gun';
import 'gun/sea';
import 'gun/axe';

export const db = GUN();

export const user = db.user();
