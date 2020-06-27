import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import { Wrap } from '../';
import { Service } from '../';

import '../../../assets/scss/profile/ComissionReport.scss';

const ComissionReport = () => {

	const [ reports, setReports ] = useState({
		status: 0,
		list: [],
	});

	useEffect(() => {

		const req = Service.Agency.report({
			ty: '1',
		});

		req.promise.then(r => {

			console.info(r);

			setReports({
				status: 1,
				list: r.info.map(r => r),
			});

		}, e => {

			if (!e.is_aborted) {
				console.warn(e);
			}

		});

		return () => req.cancel();

	}, []);

	return (
		<Wrap name="佣金报告" className="comission-report" isLoading={!reports.status}>
			<div className="table-columns sb">
				<p>名称</p>
				<p>代理商</p>
				<p>量</p>
				<p>时间</p>
			</div>
			<div className="table-content table-like">
				{reports.list.map((report, i) => (
				<div key={i} className={cx('table-content--item')}>
					<div className="inner">
						<p>{report.agent_name}</p>
						<p>{report.real_name}</p>
						<p>{report.amount}</p>
						<p>{report.verify_time}</p>
					</div>
				</div>
				))}
			</div>
		</Wrap>
	);

}

export default ComissionReport;
