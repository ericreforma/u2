import React, { useState, useEffect } from 'react';

import { Wrap } from '../';
import { Service } from '../';

import '../../../assets/scss/profile/Members.scss';

const Members = () => {

	const [ members, setMembers ] = useState({
		status: 0,
		list: [],
	});

	useEffect(() => {

		const q = Service.Agency.members();

		q.promise.then(r => {

			setMembers(m => ({
				...m,
				status: 1,
				list: r.info.map(m => m),
			}));

			console.info(r);

		}, e => {

			if (!e.is_aborted) {
				console.warn(e);
			}

		});

		return () => q.cancel();

	}, []);

	return (
		<Wrap name="会员名单" className="members" isLoading={!members.status}>
			<div className="table-columns">
				<p>账号</p>
				<p>注册日期</p>
			</div>
			<div className="table-content">
				{members.list.map((member, i) => (
				<div key={i} className="table-content--item">
					<p>{member.account}</p>
					<p>{member.regTime}</p>
				</div>
				))}
			</div>
		</Wrap>
	);

}

export default Members;
