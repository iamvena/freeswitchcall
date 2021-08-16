import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
// import { Strategy } from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt"){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: any){
        return {
            userId: payload.sub,
            username: payload.username
        };
    }
}