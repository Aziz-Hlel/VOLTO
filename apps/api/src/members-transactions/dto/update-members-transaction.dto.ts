import { PartialType } from '@nestjs/mapped-types';
import { CreateMembersTransactionDto } from './create-members-transaction.dto';

export class UpdateMembersTransactionDto extends PartialType(CreateMembersTransactionDto) {}
