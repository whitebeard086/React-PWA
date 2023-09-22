// import { createBrowserRouter } from 'react-router-dom';

// <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
// 	<Route path="/" element={<Landing />} />
// 	<Route path="browse" element={<Browse />} />
// 	<Route path="browse/:categorySlug" element={<Category />} />
// 	<Route path="browse/profile/:providerSlug" element={<ProviderProfile />} />
// 	<Route element={<RequireAuth />}>
// 		<Route path="verify" element={<Verify />} />
// 		<Route element={<RequireServiceProvider />}>
// 			<Route path="service-setup" element={<Service />} />
// 			<Route path="profile" element={<Profile />} />
// 			<Route path="service/edit" element={<EditService />} />
// 			<Route path="withdraw" element={<Withdraw />} />
// 		</Route>
// 		<Route element={<CheckVerifications />}>
// 			<Route path="chat/:providerSlug" element={<Chat />} />
// 			<Route path="settings" element={<Settings />} />
// 			<Route path="refer-and-earn" element={<Referral />} />
// 			<Route path="profile/kyc" element={<Kyc />} />
// 			<Route path="profile/kyb" element={<Kyb />} />
// 			<Route path="transactions" element={<Payments />} />
// 			<Route path="requests" element={<Requests />} />
// 			<Route path="requests/history" element={<History />} />
// 			<Route path="requests/disputes/:uid" element={<DisputeChat />} />
// 			<Route path="transaction-pin" element={<Pin />} />
// 			<Route path="bills/airtime" element={<Airtime />} />
// 			<Route path="bills/data" element={<Data />} />
// 			<Route path="bills/disco" element={<Disco />} />
// 			<Route
// 				path="bills/cable"
// 				element={<Cable />}
// 				lazy={() => import('@/views/bills/cable')}
// 			/>
// 			<Route path="unauthorized" element={<Unauthorized />} />
// 			<Route path="/profile/notifications" element={<Notifications />} />
// 		</Route>
// 	</Route>
// </Route>;
// const router = createBrowserRouter([
// 	{
// 		path: '/',
// 		element: <Layout />,
// 		errorElement: <ErrorPage />,
// 		children: [
// 			{
// 				errorElement: <ErrorPage />,
// 				children: [
// 					{
// 						index: true,
// 						element: <Landing />,
// 					},
// 					{
// 						path: 'register',
// 						element: <Register />,
// 					},
// 					{
// 						path: 'login',
// 						element: <Login />,
// 					},
// 					{
// 						path: 'home',
// 						element: <Views />,
// 					},
// 				],
// 			},
// 		],
// 	},
// ]);
