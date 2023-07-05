import { ScreenContext } from '..'
import { observer } from 'mobx-react-lite'
import React from 'react'
import {AssortmentMinimalInfo} from "~/api/catalog";

import '../styles.module.css'

interface Props {
  item: AssortmentMinimalInfo
}

const ListItem = observer(({ item }: Props) => {
  return (
    <div styleName="row">
      <span styleName="productName">{item.name}</span>
      <span styleName="article">{item.article}</span>
    </div>
  )
})

export default ListItem
