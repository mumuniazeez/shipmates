import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { User } from 'generated/prisma';
import { UserResponseDto } from './dto/user-response.dto';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get the current user',
    description:
      'Get the current user based on the JWT token provided in the request. This endpoint returns the user information associated with the token.',
  })
  @ApiResponse({
    status: 200,
    type: UserResponseDto,
  })
  @Get('me')
  findMe(@GetUser() user: User) {
    return user;
  }

  @ApiOperation({
    summary: 'Get a user by ID',
    description:
      'Get a user by their unique identifier (ID). This endpoint requires the ID parameter and returns the corresponding user information.',
  })
  @ApiResponse({
    status: 200,
    type: UserResponseDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
