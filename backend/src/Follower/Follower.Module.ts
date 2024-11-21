import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import FollowerEntity from "./Follower.Entity";
import FollowerController from "./Follower.Controller";
import FollowerService from "./Follower.Service";
import UserEntity from "../User/User.entity";
import AuthModule from "../Auth/Auth.Module";
import LikeEntity from "src/Like/Like.entity";
import PostEntity from "src/Post/Post.entity";

@Module({
    controllers: [FollowerController],
    providers: [FollowerService],
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            FollowerEntity,
            UserEntity,
            LikeEntity,
            PostEntity
        ])
    ]
})
export default class FollowerModule { }