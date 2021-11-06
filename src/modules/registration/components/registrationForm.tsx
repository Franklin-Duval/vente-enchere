/* eslint-disable no-unused-vars */
import { Button, Form, Input, notification } from 'antd';
import { useState } from 'react';
import { PRIMARY } from '../../../shared/colors';

type LayoutType = Parameters<typeof Form>[0]['layout'];

export const RegistrationForm = () => {
  // const router = useRouter();
  const [form] = Form.useForm();
  const [formLayout] = useState<LayoutType>('vertical');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form
      layout={formLayout}
      form={form}
      labelCol={{ span: 20 }}
      wrapperCol={{ span: 25 }}
      initialValues={{}}
      scrollToFirstError
      onFinish={async (data) => {
        setIsLoading(true);
        notification.success({ message: 'Success' });
      }}
    >
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
      >
        <Input placeholder='nom' />
      </Form.Item>

      <Form.Item
        label='Prénom'
        name='prenom'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre prénom',
          },
        ]}
      >
        <Input placeholder='prénom' />
      </Form.Item>

      <Form.Item
        label='Adresse mail'
        name='email'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre mail',
          },
          {
            type: 'email',
            message: "Le format de l'email n'est pas respecté",
          },
        ]}
      >
        <Input placeholder='email' />
      </Form.Item>

      <Form.Item
        label='Téléphone'
        name='telephone'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre contact téléhonique',
          },
        ]}
      >
        <Input placeholder='telephone' />
      </Form.Item>

      <Form.Item
        label='Adresse'
        name='adresse'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre adresse',
          },
        ]}
      >
        <Input placeholder='adresse' />
      </Form.Item>

      <Form.Item
        label='Ville'
        name='ville'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre ville',
          },
        ]}
      >
        <Input placeholder='ville' />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Veuillez renseigner votre mot de passe',
          },
        ]}
      >
        <Input.Password placeholder='password' />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          loading={isLoading}
          size='large'
          style={{
            width: '100%',
            backgroundColor: PRIMARY,
            borderColor: 'transparent',
          }}
        >
          Créer son compte
        </Button>
      </Form.Item>
    </Form>
  );
};
