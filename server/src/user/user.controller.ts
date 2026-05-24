import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { User } from 'generated/prisma';
import { UserResponseDto } from 'src/global/dto';

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

  @ApiOperation({
    summary: 'Update the current user profile',
    description:
      'Update the current user profile based on the JWT token provided in the request. This endpoint returns the new user information associated with the token.',
  })
  @ApiResponse({
    status: 200,
    type: UserResponseDto,
  })
  @Patch(':id')
  update(@GetUser('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
