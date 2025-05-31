import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, FieldValues, DefaultValues } from 'react-hook-form';

type FormHOCProps<T> = {
  defaultValues: T;
  routes: {
    list: string;
    addTitle: string;
    editTitle: string;
    listTitle: string;
    baseTitle?: string;
    basePath?: string;
  };
};

export function withFormHOC<T extends FieldValues>({ defaultValues, routes }: FormHOCProps<T>) {
  return function FormComponent(WrappedComponent: React.ComponentType<any>) {
    return function EnhancedComponent(props: any) {
      const { id } = useParams();
      const navigate = useNavigate();

      const {
        register,
        reset,
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        getValues,
      } = useForm<T>({ defaultValues: defaultValues as DefaultValues<T> });

      const breadcrumbItems = [
        {
          to: routes.basePath || '/',
          title: routes.baseTitle || 'Home',
        },
        {
          to: routes.list,
          title: routes.listTitle || 'List',
        },
        {
          title: id ? routes.editTitle : routes.addTitle,
        },
      ];

      return (
        <WrappedComponent
          {...props}
          id={id}
          breadcrumbItems={breadcrumbItems}
          title={id ? routes.editTitle : routes.addTitle}
          register={register}
          control={control}
          errors={errors}
          watch={watch}
          handleSubmit={handleSubmit}
          reset={reset}
          navigate={navigate}
          setValue={setValue}
          getValues={getValues}
          isEditMode={!!id}
        />
      );
    };
  };
}
