import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    secondName: string;
    @ApiProperty()
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @ApiProperty()
    @IsString()
    @Length(8)
    password: string;
    @ApiProperty()
    @IsEnum(Role, { message: 'Invalid user role' })
    @IsNotEmpty()
    role: Role;
}
