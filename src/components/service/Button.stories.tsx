import React from "react";
import { Button, ButtonProps } from "./Button";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: {
      type: 'string',
      description: 'Вариант внешнего вида кнопки',
      defaultValue: 'default',
      options: ['default', 'square', 'rectangle', 'round', 'link'],
      control: {
        type: 'radio',
      }
    },
    size: {
      type: 'string',
      description: 'Вариант размера кнопки',
      defaultValue: 'default',
      options: ['medium', 'small', 'large'],
      control: {
        type: 'radio',
      }
    },
    type: {
      type: 'string',
      description: 'Тип кнопки',
      defaultValue: 'button',
      options: ['button', 'submit', 'reset'],
      control: {
        type: 'radio',
      }
    },
    children: {
      type: 'string',
      name: 'Текст кнопки',
      defaultValue: 'Я кнопка',
    },
    autoFocus: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    id: {
      control: 'text',
    },
    form: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    backgroundImage: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default = () => (
  <Button id="noID" variant="default" color="white">
    Я твоя кнопка!
    <br />
    Нажми меня полностью!
  </Button>
);

export const Primary: Story = {
  args: {
    variant: "rectangle",
    children: "Primary Button",
    size: "small",
    color: "grey"
  },
};

export const BuyBtn: Story = {
  args: {
    variant: "square",
    children: "",
    backgroundImage: "./img/icons8-shopping-basket-64.png",
    color: "green"
  },
};