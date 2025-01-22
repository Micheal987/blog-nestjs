import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { user } from '@prisma/client'
import { Observable } from 'rxjs'
import { Role } from '../enum'

@Injectable()
export class GuardGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest()?.user as user
    const roles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()])
    console.log(user)
    console.log(user.role)
    console.log(user.role == 'ADMIN')
    return roles.length != 0 ? roles.some((r) => user?.role == r) : true
  }
}
