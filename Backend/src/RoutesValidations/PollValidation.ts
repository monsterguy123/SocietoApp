import zod from 'zod'

export const SuggestionSchema = zod.object({
    title:zod.string(),
    options:zod.array(zod.string()),
})