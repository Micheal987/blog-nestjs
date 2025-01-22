import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import type { Role } from '../enum'
import { GuardGuard } from '../guard/guard.guard'
export function Auth(...roles: Role[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard('jwt'),GuardGuard))
}
