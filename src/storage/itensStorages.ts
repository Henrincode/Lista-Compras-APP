import { FilterStatus } from "@/types/FilterStatus"

export type ItemStorage = {
    id: string, // sequencia de caracteres rondomica.
    status: FilterStatus,
    description: string
}