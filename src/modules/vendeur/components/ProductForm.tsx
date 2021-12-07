/* eslint-disable no-unused-vars */
import {
  Button,
  Checkbox,
  Form,
  Input,
  notification,
  Select,
  Space,
  Upload,
} from 'antd';
import { useEffect, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { ConnectedUserEntity } from '../../../entities/ConnectedUserEntity';
import { CategorieEntity } from '../../../entities/Gestionproduit/categorie.entity';
import { LotEntity } from '../../../entities/Gestionproduit/lot.entity';
import { PRIMARY } from '../../../shared/colors';
import { addImageProduit, createProduit, fetchCategories } from '../network';

export const ProductForm = ({
  currentNum,
  setCurrentNum,
}: {
  currentNum?: number;
  setCurrentNum?: (val: number) => void;
}) => {
  const router = useHistory();
  const connectedUser: ConnectedUserEntity = useSelector(
    (state: any) => state.userReducer,
  ).user;

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<CategorieEntity[]>([]);
  const lot: LotEntity = router.location.state as LotEntity;

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        if (data.success) {
          setCategories(data.result);
        }
      })
      .catch((err) => setCategories([]));
  }, []);

  return (
    <Form
      layout='vertical'
      form={form}
      labelCol={{ span: 20 }}
      size='large'
      wrapperCol={{ span: 25 }}
      initialValues={{}}
      scrollToFirstError
      onFinish={async (data) => {
        setIsLoading(true);
        const images = data.images?.fileList.map((im: any) => im.originFileObj);
        const dataToPost = {
          nom: data.nom,
          description: data.description,
          prixMin: Number(data.prixMin),
          vendeur: connectedUser._id,
          lotId: lot._id,
          category: data.category,
          quantite: {
            valeur: Number(data.quantite),
            unite: data.unite,
          },
          estBio: data.estBio,
        };
        console.log(dataToPost);

        await createProduit(dataToPost).then(async (data) => {
          if (data.success) {
            await addImageProduit(data.result[0]._id, images).then((dataIm) => {
              if (data.success) {
                notification.success({
                  message: 'Succès',
                  description: data.message,
                });
              } else {
                notification.success({
                  message: 'Succès',
                  description:
                    'Le produit a été enregistré avec succès, mais sans les images (une erreur) ',
                });
              }
            });
            if (currentNum !== undefined) {
              setCurrentNum?.(currentNum + 1);
              form.resetFields();
            }
          }
        });
        setIsLoading(false);
      }}
    >
      <Space size={40} style={{ width: '100%', flexWrap: 'wrap' }}>
        <Form.Item
          label='Nom'
          name='nom'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Veuillez renseigner votre nom',
            },
          ]}
          style={{ width: 500 }}
        >
          <Input placeholder='nom' />
        </Form.Item>

        <Form.Item
          label='Quantité'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Quantité obligatoire',
            },
          ]}
        >
          <Input.Group compact style={{ margin: 0 }}>
            <Form.Item
              name='quantite'
              rules={[
                {
                  required: true,
                  message: 'Quantité obligatoire',
                },
              ]}
              style={{ width: 150 }}
            >
              <Input placeholder='quantité' type='number' />
            </Form.Item>

            <Form.Item
              name='unite'
              rules={[
                {
                  required: true,
                  message: "L'unité est obligatoire",
                },
              ]}
            >
              <Select style={{ width: 200 }} placeholder='unité du produit'>
                <Select.Option value='Unité'>Unité</Select.Option>
                <Select.Option value='Sac'>Sac</Select.Option>
                <Select.Option value='Gramme'>Gramme</Select.Option>
                <Select.Option value='Kilogramme'>Kilogramme</Select.Option>
                <Select.Option value='Tonne'>Tonne</Select.Option>
                <Select.Option value='Camion'>Camion</Select.Option>
                <Select.Option value='Cajoule'>Cajoule</Select.Option>
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>
      </Space>

      <Form.Item
        label='Description'
        name='description'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre prénom',
          },
        ]}
        style={{ width: '75%' }}
      >
        <Input.TextArea
          rows={5}
          placeholder='Veuillez donner plus de details sur votre produit'
        />
      </Form.Item>

      <Space size={40} style={{ width: '100%', flexWrap: 'wrap' }}>
        <Form.Item
          label='Prix de mise au enchères'
          name='prixMin'
          hasFeedback
          rules={[
            {
              required: true,
              message:
                'Veuillez renseigner le prix minimal auquel vous vendez votre priduit',
            },
          ]}
          style={{ width: 300 }}
        >
          <Input placeholder='mise à prix (FCFA) ' type='number' />
        </Form.Item>

        <Form.Item
          label='Categorie'
          name='category'
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Veuillez renseigner la categorie de votre produit',
            },
          ]}
          style={{ width: 300 }}
        >
          <Select style={{ width: 300 }} placeholder='Choisissez la categorie'>
            {categories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.nom}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name='estBio'
          valuePropName='checked'
          label='Votre produit est-il 100% bio ?'
          style={{ width: 300 }}
        >
          <Checkbox />
        </Form.Item>
      </Space>

      <Form.Item
        name='images'
        label='Images'
        rules={[
          {
            required: true,
            message: "L'image de l'article est obligatoire",
          },
        ]}
        style={{ width: '90%' }}
      >
        <Upload name='images' listType='picture' action={undefined}>
          <Button icon={<FiUpload style={{ marginRight: 10 }} />}>
            Chargez les image du produits
          </Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          loading={isLoading}
          size='large'
          style={{
            backgroundColor: PRIMARY,
            borderWidth: 0,
          }}
        >
          Ajouter le Produit
        </Button>
      </Form.Item>
    </Form>
  );
};
