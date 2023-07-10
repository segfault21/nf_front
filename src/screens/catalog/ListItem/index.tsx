import { observer } from 'mobx-react-lite'
import React from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

import './styles.module.css'
import {Product} from "~/api/catalog/products";

interface Props {
    item: Product
}

const ListItem = observer(({ item }: Props) => {
  return (
      <Card variant="outlined" sx={{ width: 320 }}>
          <div>
              <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                  {item.name}
              </Typography>
              <Typography level="body2">{item.article}</Typography>
              <IconButton
                  aria-label="В избранное"
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
              >
                  <BookmarkAdd />
              </IconButton>
          </div>
          <AspectRatio minHeight="400px" maxHeight="400px">
              <img
                  src={item.images[0]}
                  loading="lazy"
                  alt=""
              />
          </AspectRatio>
          <CardContent orientation="horizontal">
              <div>
                  <Typography level="body3">Цена:</Typography>
                  <Typography fontSize="lg" fontWeight="lg">
                      {item.prices.map((p) => p.value)?? null}₽
                  </Typography>
              </div>
              <Button
                  variant="solid"
                  size="sm"
                  color="primary"
                  aria-label="Купить"
                  sx={{ ml: 'auto', fontWeight: 600 }}
              >
                  В корзину
              </Button>
          </CardContent>
      </Card>
  )
})

export default ListItem
