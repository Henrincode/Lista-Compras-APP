import { FilterStatus } from "@/types/FilterStatus"
import AsyncStorage from "@react-native-async-storage/async-storage"

const ITENS_STORAGE_KEY = '@listacompras:itens'

export type ItemStorage = {
    id: string, // sequencia de caracteres rondomica.
    status: FilterStatus,
    description: string
}

// função base para consulta de dados
async function get(): Promise<ItemStorage[]> {
    try {
        const storage = await AsyncStorage.getItem(ITENS_STORAGE_KEY)

        return storage ? JSON.parse(storage) : []

    } catch (error) {
        throw new Error('ITEM_GAT: ' + error)
    }
}

async function save(itens: ItemStorage[]): Promise<void> {
    try {

        const storage = await AsyncStorage.setItem(ITENS_STORAGE_KEY, JSON.stringify(itens))

    } catch (error) {
        throw new Error('ITEM_SAVE: ' + error)
    }
}

async function add(newItem: ItemStorage): Promise<ItemStorage[]> {
    const itens = await get()
    const updateItem = [...itens, newItem]
    itens.push(newItem)
    await save(updateItem)

    return updateItem
}


async function getByFilter(status: FilterStatus) {
    const itens = await get()
    const itensFiltrados = itens.filter(item => item.status === status)

    return itensFiltrados
}


async function clear() {
    try {
        await AsyncStorage.removeItem(ITENS_STORAGE_KEY)
    } catch (error) {
        throw new Error('CLEAR ' + error)
    }
}

async function remove(id: string) {
    const itens = await get()
    const updateItem = itens.filter(item => item.id !== id)
    await save(updateItem)
}


export const fnStorage = {
    get,
    save,
    add,
    getByFilter,
    clear,
    remove
}