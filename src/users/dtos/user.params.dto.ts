import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class UserParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id?: number;
}
