import { FC, useState, useEffect, MouseEvent, useRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import Popover from '@mui/material/Popover';

import { useMedia } from '../../../hooks';
import { uploadImage } from '../../utils';
import { Transition } from '../Transition';
import { baseURL } from '../../..';

import './styles.scss';

export const ProductCard: FC<any> = ({ value, isOpen, onClose, onSave }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isMobile = useMedia('(max-width: 768px)');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState();
  const [images, setImages] = useState<any[]>([]);
  const [imageIds, setImageIds] = useState<any[]>([]);
  const refInput = useRef<any>();

  useEffect(() => {
    if (value && isOpen) {
      setTitle(value.title);
      setImageIds(value.imageIds || []);
    }
  }, [value, isOpen]);

  const handleUploadImage = (event: any) => {
    const file = event?.target?.files?.[0];

    if (!file) return;
    setImage(file);
  };

  const handleUploadImages = (event: any) => {
    const files = event?.target?.files;

    setImages((prev) => [...prev, ...files]);
  };

  const handleSave = async (event: MouseEvent<HTMLButtonElement>) => {
    const isValid = title.trim() && (image || value?.imageId);

    if (!isValid) {
      setAnchorEl(event.currentTarget);
      return;
    }

    try {
      let imageId = value?.imageId;

      if (image) {
        imageId = await uploadImage(image);
      }

      const valueImageIds = [...imageIds].filter((id) => id !== value?.imageId);

      if (images?.length) {
        for (const value of images) {
          const newId = await uploadImage(value);

          valueImageIds.push(newId);
        }
      }

      const data = {
        ...value,
        title: title.trim(),
        imageId,
        imageIds: valueImageIds,
      };

      const response = await axios.put(`/products/${value.id}`, data);
      if (response.status !== 200 || typeof response.data === 'string') {
        throw new Error('bad response');
      }

      clearForm();
      onSave();
    } catch (error) {
      console.log(error);
      toast.error('Произошла ошибка, попробуйте позже');
    }
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    onClose();
    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setImage(undefined);
    setImages([]);
    setImageIds([]);
  };

  const removeImages = (index: number) => {
    setImages(images.filter((item, ind) => ind !== index));
    refInput.current.value = null;
  };

  const removeImageIds = (id: number) => {
    setImageIds(imageIds.filter((item) => item !== id));
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Редактирование товара
          </Typography>
          <Button
            aria-describedby={id}
            autoFocus
            color="inherit"
            onClick={handleSave}
          >
            Сохранить
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }}>Заполните поля</Typography>
          </Popover>
        </Toolbar>
      </AppBar>
      <Box
        component="form"
        sx={{
          '& > :not(style)': {
            my: 3,
            mx: isMobile ? 0 : 2,
            width: isMobile ? '100vw' : '50vw',
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Наименование"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': {
            mb: 3,
            mx: isMobile ? 0 : 2,
            width: isMobile ? '100vw' : '50vw',
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Button variant="contained" component="label">
          Загрузить основную картинку
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleUploadImage}
          />
        </Button>

        {(image || value?.imageId) && (
          <div>
            <img
              alt="not found"
              width="250px"
              src={
                image
                  ? URL.createObjectURL(image)
                  : `${baseURL}/images/${value.imageId}`
              }
            />
          </div>
        )}
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': {
            mb: 3,
            mx: isMobile ? 0 : 2,
            width: isMobile ? '100vw' : '50vw',
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Button variant="contained" component="label">
          Загрузить дополнительные картинки
          <input
            type="file"
            multiple
            hidden
            ref={refInput}
            accept="image/*"
            onChange={handleUploadImages}
          />
        </Button>

        <div className="list-imgs">
          {imageIds
            ?.filter((id: number) => id !== value?.imageId)
            ?.map((id: number) => (
              <div key={id} className="list-img-item">
                <img
                  alt="not found"
                  width="250px"
                  src={`${baseURL}/images/${id}`}
                />
                <IconButton
                  aria-label="delete"
                  className="list-img-item__close"
                  onClick={() => removeImageIds(id)}
                >
                  <CancelIcon />
                </IconButton>
              </div>
            ))}
          {images?.map((item, index) => (
            <div key={index} className="list-img-item">
              <img
                alt="not found"
                width="250px"
                src={URL.createObjectURL(item)}
              />
              <IconButton
                aria-label="delete"
                className="list-img-item__close"
                onClick={() => removeImages(index)}
              >
                <CancelIcon />
              </IconButton>
            </div>
          ))}
        </div>
      </Box>
    </Dialog>
  );
};
