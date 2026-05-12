import { View, Image, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import { Item } from '@/components/Item';
import { Input } from '@/components/Input/index';
import { Filter } from '@/components/Filter';
import { Button } from '@/components/Button'


import { style } from './style';
import { FilterStatus } from '@/types/FilterStatus';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export default function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState('')


  const itensDataTeste = {
    id: 234,
    status: FilterStatus.DONE,
    description: "descrição top"
  }
  return (
    <View style={style.container}>
      <Image source={require('@/assets/logo.png')} style={style.logo} />

      <View style={style.form}>
        <Input
          placeholder='O que você precisa comprar?'
          onChangeText={setDescription}
          value={description}
        />

        <Button title="Adicionar" />
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
            <Text style={style.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        {/* os itens estão aqui !!! */}
        <Item data={itensDataTeste} />

      </View>

    </View>
  );
}


