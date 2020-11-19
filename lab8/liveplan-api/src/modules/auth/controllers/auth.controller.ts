import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {
    LoginDto,
    RefreshTokenDto,
    ResetPasswordStartDto,
    TokenResponseDto,
    VerifyResetPasswordCodeDto,
    VerifyResetPasswordDto,
} from '../dtos';
import {AuthService} from '../services/auth.service';
import {AuthGuard} from '@nestjs/passport';
import {ApiBasicAuth, ApiBody, ApiResponse} from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @ApiBasicAuth()
    @ApiBody({type: LoginDto})
    @ApiResponse({status: 201,
        description: 'New access and refresh tokens were successfully created',
        type: TokenResponseDto})
    @ApiResponse({status: 401, description: 'Email or password is incorrect'})
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req): Promise<TokenResponseDto> {
        return this.authService.login(req.user._id, req.user.email);
    }

    @ApiBody({type: RefreshTokenDto})
    @ApiResponse({status: 201,
        description: 'New access token by existing refresh tokens was successfully created',
        type: TokenResponseDto})
    @ApiResponse({status: 400, description: 'Refresh token is invalid'})
    @Post('get-access-token')
    async getAccessToken(@Body() tokenBody: RefreshTokenDto): Promise<TokenResponseDto> {
        return this.authService.getAccessToken(tokenBody.token);
    }

    @ApiBody({type: ResetPasswordStartDto})
    @ApiBasicAuth()
    @ApiResponse({status: 201,
        description: 'Reset password was initiated. Secret code has been sent to user email'})
    @ApiResponse({status: 401, description: 'User credentials are invalid'})
    @ApiResponse({status: 404, description: 'User wasn\'t found by inserted email'})
    @Post('reset-password-start')
    async resetPasswordStart(@Body() credentials: ResetPasswordStartDto): Promise<void> {
        return this.authService.resetPasswordStart(credentials);
    }

    @ApiBody({type: VerifyResetPasswordCodeDto})
    @ApiBasicAuth()
    @ApiResponse({status: 200,
        description: 'Secret code is correct/incorrect',
        type: Boolean})
    @Post('reset-password-verify-code')
    async resetPasswordVerifyCode(@Body() credentials: VerifyResetPasswordCodeDto): Promise<boolean> {
        return this.authService.checkCodeForReset(credentials);
    }

    @ApiBody({type: VerifyResetPasswordDto})
    @ApiResponse({status: 201,
        description: 'User password has been change. New access and refresh tokens were generated',
        type: TokenResponseDto})
    @ApiResponse({status: 400, description: 'Passwords don\'t match. Secret code is invalid'})
    @ApiResponse({status: 404, description: 'User wasn\'t found by the following email'})
    @Post('reset-password-verify-password')
    async resetPasswordVerifyPassword(@Body() credentials: VerifyResetPasswordDto): Promise<TokenResponseDto> {
        return this.authService.resetPassword(credentials);
    }
}
