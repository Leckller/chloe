import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import CreateUserDto from "./DTOs/CreateUser.Dto";
import AuthGuard from "../Guard/Auth.Guard";
import UserService from "./User.Service";
import LoginUserDto from "./DTOs/LoginUser.Dto";

@Controller('user')
export default class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Post()
    public async createUser(@Body() { address, banner, email, name, password, photo }: CreateUserDto) {

        return await this.userService.createUser({ address, banner, email, name, password, photo });

    }

    @Get("address/:address")
    @UseGuards(AuthGuard)
    public async getUserByAddress(@Param('address') address) {

        return await this.userService.getUserByAddress(address);

    }

    @Get("id/:id/:page")
    @UseGuards(AuthGuard)
    public async getUserById(@Param() { id, page }: { id: string, page: string }) {

        return await this.userService.getUserById(+id, +page);

    }

    @Post("login")
    public async login(@Body() { email, password }: LoginUserDto) {

        return await this.userService.login({ email, password });

    }

}