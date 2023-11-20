import React from "react";
import { Button, ButtonProps } from "./Button";
import { Meta, Story } from "@storybook/react";

export default {
  title: "UI/Button",
  component: Button,
  argTypes:{
    variant:{
        type: 'string',
        description: 'Вариант внешнего вида кнопки',
        defaultValue: 'default',
        options: ['default', 'small','large','square','round'],
        control:{
            type:'radio',
        }
    }
  }
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = () => <Button id={"noID"} className={"noClass"}>Я твоя кнопка!<br />Нажми меня полностью!</Button>

export const Primary = Template.bind({});
Primary.args = {
  children: "Primary Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  children: "Secondary Button",
};