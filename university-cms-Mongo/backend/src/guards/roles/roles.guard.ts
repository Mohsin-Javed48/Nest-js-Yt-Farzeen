import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from './roles-enum';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-decoraters';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[
      context.getHandler(),
      context.getClass(),
    ]);

    if(!requiredRoles) return true;
    const request = context.switchToHttp().getRequest<{headers: Record<string, string>}>();
    const userRole = request.headers['user-role'] as Role;
    if(!userRole) return false;
    if(requiredRoles.includes(userRole)) return true;

    return false;
  }
}
