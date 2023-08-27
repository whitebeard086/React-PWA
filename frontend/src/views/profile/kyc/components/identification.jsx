import {
	Badge,
	Button,
	FormContainer,
	FormItem,
	Input,
	Select,
	Upload,
} from '@/components/ui';
import { getUser } from '@/store/auth/userSlice';
import { popNotification } from '@/utils/toast';
import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { initiateKyc, resetState } from '../store';

const isSubmitButtonDisabled = (documentType, values) => {
	if (documentType === 'nin') {
		return values.nin === '';
	} else if (documentType === 'passport') {
		return values.passportCover === '' || values.passportDataPage === '';
	} else if (documentType === 'voterId') {
		return values.voterIdFront === '' || values.voterIdBack === '';
	} else if (documentType === 'driversLicense') {
		return (
			values.driversLicenseFront === '' || values.driversLicenseBack === ''
		);
	}
	return false; // By default, button is not disabled
};

const validationSchema = Yup.object().shape({
	documentType: Yup.string().required('Please select your document type'),
	passportCover: Yup.string().when('documentType', {
		is: 'passport',
		then: Yup.string().required('Please upload passport cover'),
		otherwise: Yup.mixed().notRequired(),
	}),
	passportDataPage: Yup.string().when('documentType', {
		is: 'passport',
		then: Yup.string().required('Please upload passport data page'),
		otherwise: Yup.mixed().notRequired(),
	}),
	voterIdFront: Yup.string().when('documentType', {
		is: 'voterId',
		then: Yup.string().required("Please upload your front Voter's ID"),
		otherwise: Yup.mixed().notRequired(),
	}),
	voterIdBack: Yup.string().when('documentType', {
		is: 'voterId',
		then: Yup.string().required("Please upload your back Voter's ID"),
		otherwise: Yup.mixed().notRequired(),
	}),
	driversLicenseFront: Yup.string().when('documentType', {
		is: 'driversLicense',
		then: Yup.string().required('Please upload your front Drivers license'),
		otherwise: Yup.mixed().notRequired(),
	}),
	driversLicenseBack: Yup.string().when('documentType', {
		is: 'driversLicense',
		then: Yup.string().required('Please upload your back Drivers license'),
		otherwise: Yup.mixed().notRequired(),
	}),
	nin: Yup.string().when('documentType', {
		is: 'nin',
		then: Yup.string().required('Please provide your NIN'),
		otherwise: Yup.mixed().notRequired(),
	}),
});

const initialValues = {
	documentType: 'passport',
	passportCover: '',
	passportDataPage: '',
	voterIdFront: '',
	voterIdBack: '',
	driversLicenseFront: '',
	driversLicenseBack: '',
	nin: '',
};

const documentTypes = [
	{ value: 'passport', label: 'Passport', desc: '' },
	{ value: 'voterId', label: "Voter's ID", desc: '' },
	{ value: 'driversLicense', label: 'Drivers License', desc: '' },
	{ value: 'nin', label: 'NIN', desc: '' },
];

const documentOptions = [
	{ value: 'passport', label: 'Passport' },
	{ value: 'voterId', label: "Voter's ID" },
	{ value: 'driversLicense', label: 'Drivers License' },
	{ value: 'nin', label: 'NIN' },
];
const documentUploadDescription = {
	passport: [
		'Clear and complete passport image is required',
		'Passport must be valid with an unexpired date',
		'The data page should display your full name, date of birth, and photo',
	],
	voterId: [
		'Ensure a clear image of the ID with all details visible',
		'Voter ID must be within its validity period',
		'Must include your complete name, date of birth, and a recognizable photo',
	],
	driversLicense: [
		'Uploaded driver license image must be sharp and eligible',
		"Driver's license should be within its valid timeframe",
		'The provided ID must feature your full name, date of birth, and a clear photo',
	],
	nin: [
		'Provide your National Identification Number',
		'Ensure your full name and date of birth are associated with the provided NIN',
	],
};

const DocumentUploadField = (props) => {
	const { label, name, children, touched, errors } = props;

	const onSetFormFile = (form, field, file) => {
		// console.log('File:', file);
		// console.log('Field name:', field.name);
		form.setFieldValue(field.name, URL.createObjectURL(file[0]));
		form.setFieldValue(`${field.name}File`, file[0]);
	};

	return (
		<FormItem
			label={label}
			invalid={errors[name] && touched[name]}
			errorMessage={errors[name]}
			className="mb-0"
		>
			<Field name={name}>
				{({ field, form }) => (
					<Upload
						draggable
						className="cursor-pointer h-[250px]"
						onChange={(files) => onSetFormFile(form, field, files)}
						onFileRemove={(files) => onSetFormFile(form, field, files)}
						showList={false}
						uploadLimit={1}
					>
						{field.value ? (
							<img className="p-3 max-h-[250px]" src={field.value} alt="" />
						) : (
							<div className="text-center">
								{children}
								<p className="font-semibold">
									<span className="text-gray-800 dark:text-white">
										Drop your image here, or{' '}
									</span>
									<span className="text-blue-500">browse</span>
								</p>
								<p className="mt-1 opacity-60 dark:text-white">
									Support: jpeg, png
								</p>
							</div>
						)}
					</Upload>
				)}
			</Field>
		</FormItem>
	);
};

const Identification = ({ userId }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { kycState } = useSelector((state) => state.kyc.data);

	const onSubmit = (values) => {
		const {
			documentType,
			passportCover,
			passportCoverFile,
			passportDataPageFile,
			voterIdFrontFile,
			voterIdBackFile,
			driversLicenseFrontFile,
			driversLicenseBackFile,
			passportDataPage,
			voterIdFront,
			voterIdBack,
			driversLicenseFront,
			driversLicenseBack,
			nin,
		} = values;
		const front = () => {
			if (passportCover.length !== 0) return passportCoverFile;
			if (voterIdFront.length !== 0) return voterIdFrontFile;
			if (driversLicenseFront.length !== 0) return driversLicenseFrontFile;
			return null;
		};
		const back = () => {
			if (passportDataPage.length !== 0) return passportDataPageFile;
			if (voterIdBack.length !== 0) return voterIdBackFile;
			if (driversLicenseBack.length !== 0) return driversLicenseBackFile;
			return null;
		};
		const checkNin = () => {
			if (nin.length !== 0) return nin;
			return null;
		};
		const payload = {
			user_id: userId,
			document_type: documentType,
			nin: checkNin(),
			doc_front: front(),
			doc_back: back(),
		};
		console.log('Values: ', payload);
		dispatch(initiateKyc(payload));
	};

	useEffect(() => {
		if (kycState?.status === 'success') {
			popNotification('Success', kycState.message, 'success');
			dispatch(getUser());
			dispatch(resetState('kycState'));
			navigate('/settings', { replace: true });
		}
		if (kycState?.status === 'failed') {
			popNotification('Failed', kycState?.message, 'danger');
			dispatch(resetState('kycState'));
		}
	}, [kycState, dispatch, navigate]);

	return (
		<Formik
			initialValues={initialValues}
			enableReinitialize
			// validationSchema={validationSchema}
			onSubmit={(values, { setSubmitting }) => {
				// setSubmitting(true);
				// setTimeout(() => {
				// 	onNext(values, setSubmitting);
				// }, 1000);
				onSubmit(values, setSubmitting);
			}}
		>
			{({ values, touched, errors, isSubmitting }) => {
				const validatedProps = { touched, errors };
				return (
					<Form>
						<FormContainer>
							<FormItem
								label={<p className="mt-3">Please select your ID type</p>}
								invalid={errors.documentType && touched.documentType}
								errorMessage={errors.documentType}
								className="mb-4"
							>
								<Field name="documentType">
									{({ field, form }) => (
										<Select
											field={field}
											form={form}
											options={documentOptions}
											// value={documentOptions?.value}
											value={documentOptions.filter(
												(option) => option.value === values.documentType
											)}
											onChange={(doc) => {
												form.setFieldValue(field.name, doc.value);
												// Reset other fields here
												const otherFieldsToReset = [
													'passportCover',
													'passportDataPage',
													'voterIdFront',
													'voterIdBack',
													'driversLicenseFront',
													'driversLicenseBack',
													'nin',
												];
												otherFieldsToReset.forEach((fieldName) => {
													form.setFieldValue(fieldName, '');
												});
											}}
										/>
									)}
								</Field>
							</FormItem>

							<ul className="mb-4 text-sm">
								{documentUploadDescription[values.documentType].map(
									(desc, index) => (
										<li className="mb-1 flex items-center" key={desc + index}>
											<Badge className="mr-3" innerClass="bg-emerald-500" />
											<span>{desc}</span>
										</li>
									)
								)}
							</ul>
							<div className="grid xl:grid-cols-2 gap-4">
								{values.documentType === 'passport' && (
									<>
										<DocumentUploadField
											name="passportCover"
											label="Passport Cover"
											{...validatedProps}
										>
											<img
												className="mx-auto mb-3"
												src="/img/passport.png"
												alt=""
											/>
										</DocumentUploadField>
										<DocumentUploadField
											name="passportDataPage"
											label="Passport Data Page"
											{...validatedProps}
										>
											<img
												className="mx-auto mb-3"
												src="/img/passport-data.png"
												alt=""
											/>
										</DocumentUploadField>
									</>
								)}
								{values.documentType === 'voterId' && (
									<>
										<DocumentUploadField
											name="voterIdFront"
											label="Voter's ID Front"
											{...validatedProps}
										>
											<img
												className="mx-auto mb-3"
												src="/img/id-card-front.png"
												alt=""
											/>
										</DocumentUploadField>
										<DocumentUploadField
											name="voterIdBack"
											label="Voter's Id Back"
											{...validatedProps}
										>
											<img
												className="mx-auto mb-3"
												src="/img/id-card-back.png"
												alt=""
											/>
										</DocumentUploadField>
									</>
								)}
								{values.documentType === 'driversLicense' && (
									<>
										<DocumentUploadField
											name="driversLicenseFront"
											label="Drivers License Front"
											{...validatedProps}
										>
											<img
												className="mx-auto mb-3"
												src="/img/drivers-license-front.png"
												alt=""
											/>
										</DocumentUploadField>
										<DocumentUploadField
											name="driversLicenseBack"
											label="Drivers License Back"
											{...validatedProps}
										>
											<img
												className="mx-auto mb-3"
												src="/img/drivers-license-back.png"
												alt=""
											/>
										</DocumentUploadField>
									</>
								)}
							</div>
							{values.documentType === 'nin' && (
								<FormItem
									label="NIN"
									invalid={errors.nin && touched.nin}
									errorMessage={errors.nin}
								>
									<Field
										type="text"
										autoComplete="off"
										name="nin"
										placeholder="National Identification Number"
										className="border-green-500 dark:border-green-500 focus:!ring-emerald-500"
										// onChange={(e) => {
										// 	setFieldValue('nin', e.target.value);
										// }}
										component={Input}
									/>
								</FormItem>
							)}
							<div className="flex mt-5">
								<Button
									loading={kycState?.status === 'pending'}
									block
									disabled={isSubmitButtonDisabled(values.documentType, values)}
									variant="solid"
									type="submit"
								>
									Submit
								</Button>
							</div>
						</FormContainer>
					</Form>
				);
			}}
		</Formik>
	);
};

export default Identification;
