import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import { Wrap } from '../';
import { Service } from '../';
import { Icon } from '../../../../component/';

import '../../../assets/scss/profile/AgentReport.scss';

const AgentReport = () => {

	const [ reports, setReports ] = useState({
		status: 0,
		list: [],
	});

	useEffect(() => {

		const req = Service.Agency.report({
			ty: '2',
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

	const toggle = report => {

		report.details = !report.details;

		setReports(r => ({
			...r,
			list: r.list.map(r => r.id === report.id ? report : r),
		}));

	}

	return (
		<Wrap name="代理商报告" className="agent-report" isLoading={!reports.status}>
			<div className="table-columns sb">
				<p>账号</p>
				<p>存款</p>
				<p>提款</p>
				<p>细节</p>
			</div>
			<div className="table-content table-like">
				{reports.list.map((report, i) => (
				<div key={i} className={cx('table-content--item', { open: report.details })} onClick={() => toggle(report)}>
					<div className="inner">
						<p>{report.account}</p>
						<p>{report.deposit}</p>
						<p>{report.debit}</p>
						<p className="arrow">
							<Icon name="chevron-down" />
						</p>
					</div>
					{report.details ? (
					<div className="detail">
						<table>
							<tbody>
								<tr>
									<td>代理账号：</td>
									<td>{report.account}</td>
								</tr>
								<tr>
									<td>存款金额：</td>
									<td>{report.deposit}</td>
								</tr>
								<tr>
									<td>提款金额：</td>
									<td>{report.debit}</td>
								</tr>
								<tr>
									<td>返水金额：</td>
									<td>{report.promotion}</td>
								</tr>
								<tr>
									<td>红利金额：</td>
									<td>{report.autopromo}</td>
								</tr>
								<tr>
									<td>注册时间：</td>
									<td>{report.add_time}</td>
								</tr>
							</tbody>
						</table>
					</div>
					) : null}
				</div>
				))}
			</div>
		</Wrap>
	);

}

export default AgentReport;
