import { View, Image, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import { Item } from '@/components/Item';
import { Input } from '@/components/Input/index';
import { Filter } from '@/components/Filter';
import { Button } from '@/components/Button'


import { style } from './style';
import { FilterStatus } from '@/types/FilterStatus';
import { ItemStorage, fnStorage } from '@/storage/itensStorages';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export default function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState('')
  const [itens, setItens] = useState<ItemStorage[]>([])

  async function fnAdicionarItem() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descripção para adicionar.")
    }

    const newItem: ItemStorage = {
      id: Math.random().toString(36),
      description,
      status: filter
    }

    try {
      await fnStorage.add(newItem)
      const response = await fnStorage.getByFilter(filter)
      setItens(response)
    } catch (error) {
      console.log(error)
    }

  }

  async function load() {
    const response = await fnStorage.get()
    setItens(response)
  }

  async function itemByFilter() {
    try {
      const response = await fnStorage.getByFilter(filter)
      setItens(response)
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível filtrar os itens')
    }
  }

  function fnClear() {
    Alert.alert('Limpar', 'Limpar TODOS OS ITENS?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim', onPress: () => {
          fnStorage.clear()
          setItens([])
        }
      }
    ])
  }

  async function fnRemoveItem(id: string) {
    await fnStorage.remove(id)
    await itemByFilter()
  }


  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    itemByFilter()
  }, [filter])

  return (
    <View style={style.container}>
      <Image source={require('@/assets/logo.png')} style={style.logo} />

      <View style={style.form}>
        <Input
          placeholder='O que você precisa comprar?'
          onChangeText={setDescription}
          value={description}
        />

        <Button title="Adicionar" onPress={fnAdicionarItem} />
      </View>

      <View style={style.content}>
        <View style={style.header}>


          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}

            />
          ))}

          <TouchableOpacity style={style.clearButton}>
            <Text onPress={fnClear} style={style.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {/* os itens estão aqui !!! */}
        <FlatList
          data={itens}
          renderItem={({ item }) => (
            <Item onRemove={() => fnRemoveItem(item.id)} data={item} />
          )}
          ListEmptyComponent={() => <Text style={style.empty}>Nenhum item encontrado.</Text>}
          ItemSeparatorComponent={() => <View style={style.separator} />}
          contentContainerStyle={style.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </View>
  );
}


