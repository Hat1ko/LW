import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../models/user';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        @InjectModel('User')
        private userModel: Model<User>,
        private readonly reflector: Reflector,
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        if (!request.user || !request.user.id) {
            return false;
        }
        const user = await this.userModel.findById(request.user.id, 'role');
        if (!user || !user.role) {
            return false;
        }
        return roles.includes(user.role);
    }
}
