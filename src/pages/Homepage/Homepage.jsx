import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, InputAdornment, IconButton, CircularProgress, Alert } from '@mui/material';
import background from '../../assets/img/Finalizacao.png';
import Title from '../../components/Texts/title';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import img from '../../assets/img/login.png';

const Homepage = () => {
	const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
	const [showPassword, setShowPassword] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timeout);
	}, []);

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prevData => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setIsLoading(true);
		setError('');
		setSuccess(false);

		if (formData.password !== formData.confirmPassword) {
			setError('As senhas não coincidem.');
			setIsLoading(false);
			return;
		}

		try {
			// Aqui você pode adicionar a lógica para redefinir a senha.
			// Por exemplo, chamar um serviço de API.
			await new Promise(resolve => setTimeout(resolve, 2000)); // Simula uma chamada de API.
			setSuccess(true);
			setFormData({ password: '', confirmPassword: '' });
		} catch (err) {
			setError('Ocorreu um erro ao redefinir a senha. Tente novamente mais tarde.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				backgroundImage: `url(${background})`,
				backgroundSize: { xs: 'cover', md: '100vw' },
				backgroundRepeat: 'no-repeat',
				alignItems: 'center',
				width: '100%',
				height: '100%',
				margin: 0,
				padding: 0,
				color: '#fff',
				gap: 2,
			}}
		>
			<Box
				sx={{
					width: '80%',
					gap: 2,
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'start',
					transition: 'all 700ms ease-in-out',
					transform: isVisible ? 'scale(1)' : 'scale(0.5)',
					opacity: isVisible ? 1 : 0,
				}}
			>
				<Title text='Redefinir Senha' />
				<Typography variant='body1' color='#FFF' align='left'>
					Ops, esqueceu a senha? Não se preocupe, redefina sua senha abaixo:
				</Typography>

				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'start',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 3,
							width: '100%',
							maxWidth: '450px',
						}}
					>
						<form onSubmit={handleSubmit}>
							<TextField
								label='Nova Senha'
								type={showPassword ? 'text' : 'password'}
								variant='outlined'
								color='secondary'
								fullWidth
								margin='normal'
								name='password'
								value={formData.password}
								onChange={handleChange}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onClick={handleClickShowPassword}
												edge='end'
												sx={{ '&:focus': { border: 'none' } }}
											>
												{showPassword ? (
													<VisibilityOff />
												) : (
													<Visibility />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
							<TextField
								label='Confirmar Nova Senha'
								type={showPassword ? 'text' : 'password'}
								variant='outlined'
								color='secondary'
								fullWidth
								margin='normal'
								name='confirmPassword'
								value={formData.confirmPassword}
								onChange={handleChange}
							/>
							{error && <Alert severity='error'>{error}</Alert>}
							{success && <Alert severity='success'>Senha redefinida com sucesso!</Alert>}
							<Button
								type='submit'
								variant='contained'
								color='primary'
								fullWidth
								sx={{ marginTop: 2 }}
								disabled={isLoading}
							>
								{isLoading ? (
									<CircularProgress size={24} sx={{ color: '#fff' }} />
								) : (
									'Redefinir Senha'
								)}
							</Button>
						</form>
					</Box>
					<Box
						sx={{
							width: '40%',
							display: { xs: 'none', lg: 'flex' },
							justifyContent: 'center',
							height: '20rem',
							alignItems: 'center',
							flexDirection: 'column',
						}}
					>
						<img
							src={img}
							style={{
								width: '100%',
								objectFit: 'contain',
								transform: 'translateX(-5rem)',
							}}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Homepage;
