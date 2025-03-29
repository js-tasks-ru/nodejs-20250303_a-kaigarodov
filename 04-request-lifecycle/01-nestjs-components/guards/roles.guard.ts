import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Optional,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { Request } from "express";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Optional()
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const xRole = request.headers["x-role"];
    const tokenRole = await this.extractRoleFromJWT(request);

    if (![xRole, tokenRole].includes("admin"))
      throw new ForbiddenException("Доступ запрещён: требуется роль admin");

    return true;
  }

  private async extractRoleFromJWT(request: Request) {
    if (!this.jwtService) return;

    const authHeader = request.headers["authorization"];

    try {
      const token = authHeader.replace(/Bearer\s+/i, "").trim();
      const { role } = await this.jwtService.verifyAsync(token);
      return role;
    } catch {
      return null;
    }
  }
}
