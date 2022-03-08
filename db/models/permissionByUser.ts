import { DataTypes, Model } from 'sequelize';
import db from '../connections';
import { getNowUtc } from '../utils/db-utc-date';

export interface IPermissionByUser extends Model {
    id:number;
    createAt:string;
	updateAt:string;
}

export const PermissionByUserDAO = db.define<IPermissionByUser>('PermissionByUser', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        field:'permission_by_user_id'
    },
    createAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:getNowUtc(),
        field:'create_at'
    },
    updateAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:getNowUtc(),
        field:'update_at'
    }
},{
    tableName:'permissions_by_user',
    timestamps:false 
});