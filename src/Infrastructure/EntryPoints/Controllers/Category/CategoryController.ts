import { nonNull } from './../../../_Utils/NonNull';
import { GetOneCategoryUseCase } from './../../../../Domain/Category/UseCases/GetOneCategory/GetOneCategoryUseCase';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SuccessResponseDto } from '~_types/ResponseDto';
import { CategoryResponseDto } from './Dto';
import { FindAllCategoriesUseCase } from '~domain/Category/UseCases/FindAllCategories/FindAllCategoriesUseCase';
import { buildSuccessResponse } from '~_utils/ResponseDto';
import { FromCategoryModelToCategoryResponseDto } from './Mapper/CategoryResponseMapper';
import { CreateCategoryUseCase } from '~domain/Category/UseCases/CreateCategory/CreateCategoryUseCase';
import { CreteCategoryRequestDto } from './Dto/CreateCategory/CreateCategoryDto';
import { UpdateCategoryRequestDto } from './Dto/CreateCategory/UpdateCategoryDto';
import { UpdateCategoryUseCase } from '~domain/Category/UseCases/UpdateCategory/UpdateCategoryUseCase';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly getOneCategoryUseCase: GetOneCategoryUseCase,
    private readonly findAllCategoriesUseCase: FindAllCategoriesUseCase,
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase
  ) {}

  @Get()
  async findAll(): Promise<SuccessResponseDto<CategoryResponseDto[]>> {
    const categories = await this.findAllCategoriesUseCase.run();

    return buildSuccessResponse(
      categories.map(FromCategoryModelToCategoryResponseDto)
    );
  }

  @Get(':categoryId')
  async getOne(
    @Param('categoryId') categoryId: string
  ): Promise<SuccessResponseDto<CategoryResponseDto>> {
    const category = nonNull(
      await this.getOneCategoryUseCase.run({
        __By: 'CategoryId',
        CategoryId: categoryId
      })
    );

    return buildSuccessResponse(
      FromCategoryModelToCategoryResponseDto(category)
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

  @Put(':categoryId')
  async update(
    @Param('categoryId') categoryId: string,
    @Body() body: UpdateCategoryRequestDto
  ): Promise<SuccessResponseDto<CategoryResponseDto>> {
    const updatedCategory = await this.updateCategoryUseCase.run({
      CategoryId: categoryId,
      Name: body.name,
      Icon: body.icon,
      Color: body.color,
      MinValue: body.minValue,
      MaxValue: body.maxValue,
      AllowedValues: body.allowedValues
    });

    return buildSuccessResponse(
      FromCategoryModelToCategoryResponseDto(updatedCategory)
    );
  }
}
