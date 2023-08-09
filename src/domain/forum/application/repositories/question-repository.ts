import { Question } from '../../enterprise/entities/question'

export interface QuestionRepository {
  findBySlug(slug: string): Promise<Question | null>
  create(answer: Question): Promise<void>
  delete(question: Question): Promise<void>
  findById(id: string): Promise<Question | null>
}
