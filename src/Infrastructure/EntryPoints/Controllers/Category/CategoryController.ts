import { Body, Controller, Get, Post } from '@nestjs/common';
import { SuccessResponseDto } from '~_types/ResponseDto';
import { CategoryResponseDto } from './Dto';
import { FindAllCategoriesUseCase } from '~domain/Category/UseCases/FindAllCategories/FindAllCategoriesUseCase';
import { buildSuccessResponse } from '~_utils/ResponseDto';
import { FromCategoryModelToCategoryResponseDto } from './Mapper/CategoryResponseMapper';
import { CreateCategoryUseCase } from '~domain/Category/UseCases/CreateCategory/CreateCategoryUseCase';
import { CreteCategoryRequestDto } from './Dto/CreateCategory/CreateCategoryDto';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly findAllCategoriesUseCase: FindAllCategoriesUseCase,
    private readonly createCategoryUseCase: CreateCategoryUseCase
  ) {}

  @Get()
  async findAll(): Promise<SuccessResponseDto<CategoryResponseDto[]>> {
    const categories = await this.findAllCategoriesUseCase.run();

    return buildSuccessResponse(
      categories.map(FromCategoryModelToCategoryResponseDto)
    );
  }

  @Post()
  async create(
    @Body() body: CreteCategoryRequestDto
  ): Promise<SuccessResponseDto<CategoryResponseDto>> {
    const createdCategory = await this.createCategoryUseCase.run({
      Name: body.name,
      Icon: body.icon,
      Color: body.color,
      Type: body.type,
      ValueType: body.valueType,
      MinValue: body.minValue,
      MaxValue: body.maxValue,
      AllowedValues: body.allowedValues
    });

    return buildSuccessResponse(
      FromCategoryModelToCategoryResponseDto(createdCategory)
    );
  }
}
