import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { log } from 'console';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const authorization = context.switchToHttp().getRequest().headers?.authorization;
    if (!authorization) {
      log(context.switchToHttp().getRequest().headers)
      log('Authorization header not found');
      throw new UnauthorizedException();
    }

    const [, token] = authorization.split(' ');
    const payload = await this.jwtService.verifyAsync(token).catch((e) => {
      console.log(e);
      throw new UnauthorizedException();
    });

    const user = await this.userService.findOneByEmail(payload?.username);
    if (!user) {
      throw new NotFoundException({ message: 'User from token not found' });
    }
    context.switchToHttp().getRequest().headers.user = user.id;

    return requiredRoles.some((role) => user.role === role);
  }
}