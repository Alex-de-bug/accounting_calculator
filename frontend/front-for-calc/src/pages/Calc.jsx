import React, { useState, useEffect } from 'react';
import {FormControlLabel, Checkbox, Container, Box, Typography, TextField, Tooltip, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/styles.css";
import { calcSelector, calcConst } from '../store/slices/CalcSlice';
import { useDispatch, useSelector } from 'react-redux';



const Calc = () => {

    const dispatch = useDispatch();
    const { ip, ooo, trading, services, building, production, catering,
        otherOPF, usnd, usndr, osn, psnosn, psnusnd, psnusndr, psnosnusndusndr,
            isEmployerOpf, additionalSettlement, kkt, ekvari, additionalPatent, agent, separateDivisions,
            FSRAR, VED, creditsLiz, countPersonals, GPH, foreignPers, decret, komandirovki,
            counterPP, constGoodsAndService, constRealizeGoodsAndService, constSchetRealizeGoodsAndService, constAvanse} = useSelector(calcSelector);



  const [result, setResult] = useState(0); // Состояние для результата
  const [resultPD, setResultPD] = useState(0); // Состояние для результата

  const [baseRate, setBaseRate] = useState(6000); // Состояние для базовой ставки
  const [opf, setOpf] = useState('ИП'); // Состояние для выбора ОПФ
  const [sno, setSno] = useState('УСН Д'); // Состояние для выбора СНО
  const [activity, setActivity] = useState('Торговля'); // Состояние для вида деятельности
  const [isEmployer, setIsEmployer] = useState(false); // Состояние для чекбокса "Является работодателем"
  const [dopRS, setDopRS] = useState(0); // Состояние для доп расчётных счетов
  const [KKT, setKKT] = useState(0); // Состояние для KKT
  const [ekvaring, setEkvaring] = useState(0); // Состояние для Экваринга
  const [dopPatent, setDopPatent] = useState(0); // Состояние для Доп Патентов
  const [agents, setAgents] = useState(0); // Состояние для кол-ва агентов
  const [obosobPod, setObosobPod] = useState(0); // Состояние для обособленных подразделений
  const [fsrar, setFsrar] = useState(false); // Состояние для чекбокса "ФСРАР"
  const [ved, setVed] = useState(false); // Состояние для чекбокса "ВЭД"
  const [credits, setCredits] = useState(false); // Состояние для чекбокса "Кредиты, лизинг"
  const [countPersonal, setCountPersonal] = useState(0); // Состояние для поля количество персонала
  const [gph, setGph] = useState(0); // Состояние для поля гпх
  const [foreign, setForeign] = useState(false); // Состояние для чекбокса иностранцы
  const [decr, setDecr] = useState(false); // Состояние для чекбокса декретницы
  const [komandirovk, setKomandirovk] = useState(false); // Состояние для чекбокса командировки
  //первичка
  const [countPP, setCountPP] = useState(0); // Состояние для поля ПП
  const [goodsAndService, setGoodsAndService] = useState(0); // Состояние для поля товары и услуги
  const [realizeGoodsAndService, setRealizeGoodsAndService] = useState(0); // Состояние для реализованных поля товары и услуги
  const [schetRealizeGoodsAndService, setSchetRealizeGoodsAndService] = useState(0); // Состояние для счёт реализованных поля товары и услуги
  const [avanse, setAvanse] = useState(0); // Состояние для поля аванс

  
  
  
  const handleChangeCheckBox = (setter) => (e) => {
    setter(e.target.checked)
  }

  const handleChangeValue = (setter) => (e) => {
    setter(e.target.value)
  }

  const handleChangeTextFields = (setter) => (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]+$/.test(value)) {
      setter(Number(value));
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(calcConst());
  }, []);



  useEffect(() => {
    let multiplier = 1;

    if(opf === 'ИП'){
        setObosobPod(0);
        setCountPersonal(0);
    } 

    if(opf === 'ООО'){
        multiplier *= ooo;
    }else{
        multiplier *= ip;
    }
    // Умножитель в зависимости от ОПФ
    if (opf === 'ООО' || (opf === 'ИП'  && (sno === 'УСН Д-Р' || sno === 'ОСН'))) {
      switch (activity) {
        case 'Торговля':
            multiplier *= trading;
            break;
        case 'Услуги':
            multiplier *= services;
            break;
        case 'Строительство':
            multiplier *= building;
            break;
        case 'Производство':
            multiplier *= production;
            break;
        case 'Общепит':
            multiplier *= catering;
            break;
        case 'Прочее':
            multiplier *= otherOPF;
            break;
        default:
          break;
      }
    }
    
    // Умножитель в зависимости от СНО
    switch (sno) {
      case 'УСН Д':
        multiplier *= usnd;
        break;
      case 'УСН Д-Р':
        multiplier *= usndr;
        break;
      case 'ОСН':
        multiplier *= osn;
        break;
      case 'ПСН + ОСН':
        multiplier *= psnosn;
        break;
      case 'ПСН + УСН Д':
        multiplier *= psnusnd;
        break;
      case 'ПСН + УСН Д-Р':
        multiplier *= psnusndr;
        break;
      case 'ПСН + ОСН, УСН Д или УСН Д-Р нулевая':
        multiplier *= psnosnusndusndr;
        break;
      default:
        break;
    }


    if (isEmployer && opf === 'ИП') {
        multiplier *= isEmployerOpf;
      }


    setResult( baseRate * multiplier + dopRS*additionalSettlement + KKT*kkt + ekvaring*ekvari + 
        dopPatent*additionalPatent + agents*agent + obosobPod*separateDivisions + fsrar*FSRAR + ved*VED + credits*creditsLiz 
        + countPersonal*countPersonals + gph*GPH + foreign*foreignPers + decr*decret + komandirovk*komandirovki );

    setResultPD( countPP*counterPP + goodsAndService*constGoodsAndService + realizeGoodsAndService*constRealizeGoodsAndService + 
        schetRealizeGoodsAndService*constSchetRealizeGoodsAndService + avanse*constAvanse )

  }, [ip, ooo, trading, services, building, production, catering,
        otherOPF, usnd, usndr, osn, psnosn, psnusnd, psnusndr, psnosnusndusndr,
        isEmployerOpf, additionalSettlement, kkt, ekvari, additionalPatent, agent, separateDivisions,
        FSRAR, VED, creditsLiz, countPersonals, GPH, foreignPers, decret, komandirovki,
        counterPP, constGoodsAndService, constRealizeGoodsAndService, constSchetRealizeGoodsAndService, constAvanse, baseRate, opf, sno, activity, isEmployer, dopRS, KKT, ekvaring, dopPatent, agents, obosobPod, fsrar, ved, credits, countPersonal, gph, foreign, decr, komandirovk, countPP, goodsAndService, realizeGoodsAndService, schetRealizeGoodsAndService, avanse]);





  return (
    <div>
        <Navbar />
        <br/>
        <Container maxWidth="sm">
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
        >


            <Tooltip title="Рассчитывается, как 3 часа работы аутсорсером">
                        <TextField 
                            label="Базовая ставка"
                            type="text"
                            value={baseRate}
                            onChange={handleChangeTextFields(setBaseRate)}
                            fullWidth
                            margin="normal"
                            inputProps={{
                            pattern: "[0-9]*",
                            }}
                            variant="filled"
                            color="secondary"
                        />
            </Tooltip>

            <Container maxWidth="sm">
                <Box
                    display="flex"
                    flexDirection="row" 
                    justifyContent="space-between" 
                    alignItems="center"
                >
                    <FormControl margin="normal" style={{ flex: 1, marginRight: '8%' }} variant="filled"
                            color="secondary">
                        <InputLabel id="opf-label">ОПФ</InputLabel>
                        <Select
                            labelId="opf-label"
                            value={opf}
                            onChange={handleChangeValue(setOpf)}
                            label="ОПФ"
                        >
                            <MenuItem value="ИП">ИП</MenuItem>
                            <MenuItem value="ООО">ООО</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl  margin="normal" style={{ flex: 1}} variant="filled"
                            color="secondary">
                        <InputLabel id="sno-label">СНО</InputLabel>
                        <Select
                            labelId="sno-label"
                            value={sno}
                            onChange={handleChangeValue(setSno)}
                            label="СНО"
                        >
                            <MenuItem value="УСН Д">УСН Д</MenuItem>
                            <MenuItem value="УСН Д-Р">УСН Д-Р</MenuItem>
                            <MenuItem value="ОСН">ОСН</MenuItem>
                            <MenuItem value="ПСН + ОСН">ПСН + ОСН</MenuItem>
                            <MenuItem value="ПСН + УСН Д">ПСН + УСН Д</MenuItem>
                            <MenuItem value="ПСН + УСН Д-Р">ПСН + УСН Д-Р</MenuItem>
                            <MenuItem value="ПСН + ОСН, УСН Д или УСН Д-Р нулевая">ПСН + ОСН, УСН Д или УСН Д-Р нулевая</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Container>

            {(opf === 'ООО' || (opf === 'ИП' && (sno === 'УСН Д-Р' || sno === 'ОСН'))) && (
                        <FormControl margin="normal" fullWidth variant="filled"
                        color="secondary">
                            <InputLabel id="activity-label">Вид деятельности</InputLabel>
                            <Select
                            labelId="activity-label"
                            value={activity}
                            onChange={handleChangeValue(setActivity)}
                            label="Вид деятельности"
                            >
                            <MenuItem value="Торговля">Торговля</MenuItem>
                            <MenuItem value="Услуги">Услуги</MenuItem>
                            <MenuItem value="Строительство">Строительство</MenuItem>
                            <MenuItem value="Производство">Производство</MenuItem>
                            <MenuItem value="Общепит">Общепит</MenuItem>
                            <MenuItem value="Прочее">Прочее</MenuItem>
                            </Select>
                        </FormControl>
                        )}

            {(opf === 'ИП') && (
                    <FormControlLabel labelPlacement="start"  
                    control={<Checkbox color="secondary" checked={isEmployer} 
                    onChange={handleChangeCheckBox(setIsEmployer)} />} label="Является работодателем" />
                    )}
            <br />

            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '29ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <div>
                    <TextField
                        label="Количество доп расчетных счетов"
                        type="text"
                        value={dopRS}
                        onChange={handleChangeTextFields(setDopRS)}
                        fullWidth
                        margin="normal"
                        inputProps={{
                        pattern: "[0-9]*", 
                        }}
                        variant="filled"
                        color="secondary"
                    />

                    <TextField
                        label="Количество ККТ"
                        type="text"
                        value={KKT}
                        onChange={handleChangeTextFields(setKKT)}
                        fullWidth
                        margin="normal"
                        inputProps={{
                        pattern: "[0-9]*", 
                        }}
                        variant="filled"
                        color="secondary"
                    />
                </div>
            </Box>

            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '29ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <div>
                    <TextField
                        label="Количество точек эквайринга"
                        type="text"
                        value={ekvaring}
                        onChange={handleChangeTextFields(setEkvaring)}
                        fullWidth
                        margin="normal"
                        inputProps={{
                        pattern: "[0-9]*", 
                        }}
                        variant="filled"
                        color="secondary"
                    />

                    <TextField
                        label="Количество доп патентов"
                        type="text"
                        value={dopPatent}
                        onChange={handleChangeTextFields(setDopPatent)}
                        fullWidth
                        margin="normal"
                        inputProps={{
                        pattern: "[0-9]*", 
                        }}
                        variant="filled"
                        color="secondary"
                    />
                </div>
            </Box>

            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '29ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <div>
                    <TextField
                        label="Количество агентов"
                        type="text"
                        value={agents}
                        onChange={handleChangeTextFields(setAgents)}
                        fullWidth
                        margin="normal"
                        inputProps={{
                        pattern: "[0-9]*", 
                        }}
                        helperText="(Wildberries, СДЭК, Boxberry и другие)"
                        variant="filled"
                        color="secondary"
                    />
            
                    {(opf === 'ООО') && (
                        <TextField
                            label="Обособленные подразделения"
                            type="text"
                            value={obosobPod}
                            onChange={handleChangeTextFields(setObosobPod)}
                            fullWidth
                            margin="normal"
                            inputProps={{
                            pattern: "[0-9]*", 
                            }}
                            variant="filled"
                            color="secondary"
                        />
                        )}
                </div>
            </Box>

            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '29ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <div>
                    <FormControlLabel labelPlacement="start" 
                        control={<Checkbox
                            color="secondary" checked={fsrar} 
                        onChange={handleChangeCheckBox(setFsrar)} />} label="Отчеты в ФСРАР" />
                
                    <FormControlLabel labelPlacement="start" 
                            control={<Checkbox color="secondary" checked={ved} 
                            onChange={handleChangeCheckBox(setVed)} />} label="ВЭД" />

                    <FormControlLabel labelPlacement="start" 
                            control={<Checkbox color="secondary" checked={credits} 
                            onChange={handleChangeCheckBox(setCredits)} />} label="Кредиты, лизинг" />
                </div>
            </Box>
            <br />
            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '29ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <div>
                    {(opf === 'ООО') && (
                    <TextField
                        label="Количество работников"
                        type="text"
                        value={countPersonal}
                        onChange={handleChangeTextFields(setCountPersonal)}
                        fullWidth
                        margin="normal"
                        inputProps={{
                        pattern: "[0-9]*", 
                        }}
                        variant="filled"
                        color="secondary"
                    />
                    )}

                    <TextField
                        label="Количество подрядчиков"
                        type="text"
                        value={gph}
                        onChange={handleChangeTextFields(setGph)}
                        fullWidth
                        margin="normal"
                        inputProps={{
                        pattern: "[0-9]*", 
                        }}
                        helperText="(по договорам ГПХ)"
                        variant="filled"
                        color="secondary"
                    />
                </div>
            </Box>

            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '29ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <div>
                    <FormControlLabel labelPlacement="start" 
                        control={<Checkbox color="secondary" checked={foreign} 
                        onChange={handleChangeCheckBox(setForeign)} />} label="Иностранные работники" />
                
                    <FormControlLabel labelPlacement="start" 
                            control={<Checkbox color="secondary" checked={decr} 
                            onChange={handleChangeCheckBox(setDecr)} />} label="Декретницы" />

                    <FormControlLabel labelPlacement="start" 
                            control={<Checkbox color="secondary" checked={komandirovk} 
                            onChange={handleChangeCheckBox(setKomandirovk)} />} label="Командировки" />
                </div>
            </Box>
            <br />
            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '29ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <div>
                    <TextField
                        label="Поступления товаров и услуг"
                        type="text"
                        value={goodsAndService}
                        onChange={handleChangeTextFields(setGoodsAndService)}
                        fullWidth
                        margin="normal"
                        inputProps={{
                        pattern: "[0-9]*", 
                        }}
                        helperText="(комплектов внесено бухгалтером в базу)"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField
                        label="Реализация товаров и услуг"
                        type="text"
                        value={realizeGoodsAndService}
                        onChange={handleChangeTextFields(setRealizeGoodsAndService)}
                        fullWidth
                        margin="normal"
                        inputProps={{
                        pattern: "[0-9]*", 
                        }}
                        helperText="(комплектов внесено бухгалтером в базу)"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField
                        label="Счет + Реализация товаров и услуг"
                        type="text"
                        value={schetRealizeGoodsAndService}
                        onChange={handleChangeTextFields(setSchetRealizeGoodsAndService)}
                        fullWidth
                        margin="normal"
                        inputProps={{
                        pattern: "[0-9]*", 
                        }}
                        helperText="(комплектов выписано бухгалтером по просьбе клиента)"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField
                        label="Авансовые отчеты"
                        type="text"
                        value={avanse}
                        onChange={handleChangeTextFields(setAvanse)}
                        fullWidth
                        margin="normal"
                        inputProps={{
                        pattern: "[0-9]*", 
                        }}
                        variant="filled"
                        color="secondary"
                    />
                </div>
            </Box>

            <TextField
                    label="Количество ПП"
                    type="text"
                    value={countPP}
                    onChange={handleChangeTextFields(setCountPP)}
                    fullWidth
                    margin="normal"
                    inputProps={{
                    pattern: "[0-9]*", 
                    }}
                    helperText="(которые делать аутсорсеру, исключая бюджетные)"
                    variant="filled"
                    color="secondary"
                />
                
            <br />
            <br />
            <Typography variant="h6" gutterBottom>
                Услуга без учёта ПД: {Number(result).toFixed(2)}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Цена обработки ПД: {Number(resultPD).toFixed(2)}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Итого: {Number((result + resultPD).toFixed(2))}
            </Typography>
        </Box>
        </Container>
        <Footer />
    </div>
  );
};

export default Calc;
