import { Module } from '@nestjs/common';
import { SignInUseCase } from './Auth/UseCases/SignIn/SignInUseCase';
import { GetOneUserUseCase } from './User/UseCases/GetOneUser/GetOneUserUseCase';
import { PersistenceModule } from 'src/Persistence/persistence.module';
import { GenerateAccessTokenUseCase } from './Token/UseCases/GenerateAccessToken/GenerateAccessTokenUseCase';
import { GenerateIDTokenUseCase } from './Token/UseCases/GenerateIDToken/GenerateIDTokenUseCase';
import { GenerateRefreshTokenUseCase } from './Token/UseCases/GenerateRefreshToken/GenerateRefreshTokenUseCase';
import { SignTokenUseCase } from './Token/UseCases/SignToken/SignTokenUseCase';
import { VerifyTokenUseCase } from './Token/UseCases/VerifyToken/VerifyTokenUseCase';
import { JwtModule } from '@nestjs/jwt';
import { DecodeTokenUseCase } from './Token/UseCases/DecodeToken/DecodeTokenUseCase';
import { RefreshAccessUseCase } from './Auth/UseCases/RefreshAccess/RefreshAccessUseCase';
import { FindAllCategoriesUseCase } from './Category/UseCases/FindAllCategories/FindAllCategoriesUseCase';
import { CreateCategoryUseCase } from './Category/UseCases/CreateCategory/CreateCategoryUseCase';

// UseCases
const authUseCases = [SignInUseCase, RefreshAccessUseCase];
const userUseCases = [GetOneUserUseCase];
const categoryUseCases = [FindAllCategoriesUseCase, CreateCategoryUseCase];
const tokenUseCases = [
  GenerateAccessTokenUseCase,
  GenerateIDTokenUseCase,
  GenerateRefreshTokenUseCase,
  SignTokenUseCase,
  DecodeTokenUseCase,
  VerifyTokenUseCase
];

@Module({
  imports: [JwtModule.register({}), PersistenceModule],
  providers: [
    ...authUseCases,
    ...userUseCases,
    ...tokenUseCases,
    ...categoryUseCases
  ],
  exports: [
    ...authUseCases,
    ...userUseCases,
    ...tokenUseCases,
    ...categoryUseCases
  ]
})
export class DomainModule {}
