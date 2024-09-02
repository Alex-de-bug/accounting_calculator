import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { calcSelector, updateCalcConst, calcConst, clearState } from '../store/slices/CalcSlice';
import { TextField, Button, Container, Box, Typography, Snackbar, Alert } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const fieldDescriptions = {
  ip: 'умножение БС для ИП',
  ooo: 'умножение БС для ООО',
  trading: 'умножение БС для торговли',
  services: 'умножение БС для услуг',
  building: 'умножение БС для строительства',
  production: 'умножение БС для производства',
  catering: 'умножение БС для общепита',
  otherOPF: 'умножение БС для прочего',
  usnd: 'умножение БС для УСН Д',
  usndr: 'умножение БС для УСН Д-Р',
  osn: 'умножение БС для ОСН',
  psnosn: 'умножение БС для ПСН + ОСН',
  psnusnd: 'умножение БС для ПСН + УСН Д',
  psnusndr: 'умножение БС для ПСН + УСН Д-Р',
  psnosnusndusndr: 'умножение БС для ПСН + ОСН и прочее',
  isEmployerOpf: 'вилка на галочку Является работодателем',
  additionalSettlement: 'вилка для доп расчётов',
  kkt: 'вилка для ккт',
  ekvari: 'вилка для точек экваринга',
  additionalPatent: 'вилка для доп патентов',
  agent: 'вилка для агентов',
  separateDivisions: 'вилка для обособленных подразделений',
  FSRAR: 'вилка на галочку Отчёты в ФСРАР',
  VED: 'вилка на галочку ВЭД',
  creditsLiz: 'вилка на галочку Кредиты, Лизинг',
  countPersonals: 'вилка на количество работников',
  GPH: 'вилка на количество подрядчиков',
  foreignPers: 'вилка на галочку Иностранные работники',
  decret: 'вилка на галочку Декретницы',
  komandirovki: 'вилка на галочку Командировки',
  counterPP: 'вилка на поле Количество ПП',
  constGoodsAndService: 'вилка на поле поступление товаров и услуг',
  constRealizeGoodsAndService: 'вилка на поле реализация товаров и услуг',
  constSchetRealizeGoodsAndService: 'вилка на поле  счёт+реал товаров и услуг',
  constAvanse: 'вилка на поле авансовые отчёты',
};

const EditCalcPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const { isLoading, isError, isSuccess, ...data } = useSelector(calcSelector);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    if (!Object.keys(data).length) {
      dispatch(calcConst());
    }
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
    }
  }, [data, setValue]);

  useEffect(() => {
    if (isError) {
      setOpenError(true);
      setTimeout(() => {
        setOpenError(false);
        dispatch(clearState());
      }, 3000);
    }

    if (isSuccess) {
      setOpenSuccess(true);
      setTimeout(() => {
        setOpenSuccess(false);
        dispatch(clearState());
      }, 3000);
    }
  }, [isError, isSuccess, dispatch]);

  const onSubmit = (formData) => {
    const updatedData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = parseFloat(formData[key]);
      return acc;
    }, {});

    dispatch(updateCalcConst(updatedData));
  };

  return (
    <div>
      <Navbar />
      <br />
      <Container>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh">
          <Typography variant="h4">Редактировать Константы</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(data).length > 0 ? (
              Object.keys(data).map((key) => (
                <Box key={key} mb={2}>
                  <TextField
                    name={key}
                    label={key}
                    type="text"
                    step="0.01"
                    {...register(key, { required: true })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <Typography variant="body2" color="textSecondary">
                    {fieldDescriptions[key] || 'Нет описания'}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography>Загрузка данных...</Typography>
            )}
            <Button type="submit" variant="contained" color="primary" disabled={isLoading} style={{ marginTop: '16px' }}>
              {isLoading ? 'Обновление...' : 'Сохранить'}
            </Button>
          </form>
          <br/>
        </Box>
        <Snackbar open={openError} autoHideDuration={3000} onClose={() => setOpenError(false)}>
          <Alert severity="error" onClose={() => setOpenError(false)}>
            Произошла ошибка при обновлении.
          </Alert>
        </Snackbar>
        <Snackbar open={openSuccess} autoHideDuration={3000} onClose={() => setOpenSuccess(false)}>
          <Alert severity="success" onClose={() => setOpenSuccess(false)}>
            Обновление прошло успешно!
          </Alert>
        </Snackbar>
      </Container>
      <Footer />
    </div>
  );
};

export default EditCalcPage;
