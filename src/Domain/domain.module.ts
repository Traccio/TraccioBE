import { Module } from '@nestjs/common';
import { SignInUseCase } from './Auth/UseCases/SignIn/SignInUseCase';
import { GetOneUnserUseCase } from './User/UseCases/GetOneUser/GetOneUserUseCase';
import { PersistenceModule } from 'src/Persistence/persistence.module';
import { GenerateAccessTokenUseCase } from './Token/UseCases/GenerateAccessToken/GenerateAccessTokenUseCase';
import { GenerateIDTokenUseCase } from './Token/UseCases/GenerateIDToken/GenerateIDTokenUseCase';
import { GenerateRefreshTokenUseCase } from './Token/UseCases/GenerateRefreshToken/GenerateRefreshTokenUseCase';
import { SignTokenUseCase } from './Token/UseCases/SignToken/SignTokenUseCase';
import { VerifyTokenUseCase } from './Token/UseCases/VerifyToken/VerifyTokenUseCase';
import { JwtModule } from '@nestjs/jwt';

// UseCases
const authUseCases = [SignInUseCase];
const userUseCases = [GetOneUnserUseCase];
const tokenUseCases = [
  GenerateAccessTokenUseCase,
  GenerateIDTokenUseCase,
  GenerateRefreshTokenUseCase,
  SignTokenUseCase,
  VerifyTokenUseCase
];

@Module({
  imports: [JwtModule.register({}), PersistenceModule],
  providers: [...authUseCases, ...userUseCases, ...tokenUseCases],
  exports: [...authUseCases, ...userUseCases, ...tokenUseCases]
})
export class DomainModule {}
