import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  all?: boolean;
}

const paginateData = (props: PaginateDto) => {
  if (!props) return undefined;
  const { page = 1, pageSize = 20, all = false } = props;

  if (all) return undefined;
  const take = pageSize;
  return {
    skip: (page - 1) * take,
    take,
  };
};
export default paginateData;
