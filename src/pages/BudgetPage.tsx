import { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  IncomeSourcesChart,
  ExpenditureChart,
} from '@/components/charts/Charts';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { usePageMeta } from '@/hooks/usePageMeta';

type QuarterKey = 'q1' | 'q2' | 'q3' | 'q4';

export default function BudgetPage() {
  const [activeQuarter, setActiveQuarter] = useState<QuarterKey>('q1');
  const { lguName, fullLocation, labels, budget } = useSiteConfig();
  usePageMeta({ title: 'Budget & Transparency' });

  const q = budget.quarters[activeQuarter];

  // Load DPWH projects script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/assets/js/dpwh-projects.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Budget & Transparency' }]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <i className="bi bi-shield-check" /> Financial Transparency
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Budget &amp; Financial Transparency
            </h1>
            <p className="text-lg text-white/90">
              Tracking {labels.lguTypeLabel.toLowerCase()} finances and projects
              for accountability
            </p>
          </div>
        </div>
      </section>

      {/* SRE Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                <i className="bi bi-graph-up-arrow" /> Financial Report
              </span>
              <h2 className="text-2xl font-bold text-gray-900">
                Statement of Receipts &amp; Expenditures
              </h2>
              <p className="text-gray-500">
                FY {budget.fiscalYear} quarterly financial performance
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeQuarter === 'q1' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-primary-500'}`}
                onClick={() => setActiveQuarter('q1')}
              >
                <span className="font-bold">Q1</span>{' '}
                <span className="text-sm opacity-75">Jan - Mar</span>
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeQuarter === 'q2' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-primary-500'}`}
                onClick={() => setActiveQuarter('q2')}
              >
                <span className="font-bold">Q2</span>{' '}
                <span className="text-sm opacity-75">Apr - Jun</span>
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeQuarter === 'q3' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-primary-500'}`}
                onClick={() => setActiveQuarter('q3')}
              >
                <span className="font-bold">Q3</span>{' '}
                <span className="text-sm opacity-75">Jul - Sep</span>
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeQuarter === 'q4' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-primary-500'}`}
                onClick={() => setActiveQuarter('q4')}
              >
                <span className="font-bold">Q4</span>{' '}
                <span className="text-sm opacity-75">Oct - Dec</span>
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-lg">
                  <i className="bi bi-arrow-down-circle text-xl" />
                </div>
                <div>
                  <span className="block text-2xl font-bold text-green-700">
                    {q.totalIncome}
                  </span>
                  <span className="text-sm text-green-600">Total Income</span>
                </div>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-lg">
                  <i className="bi bi-arrow-up-circle text-xl" />
                </div>
                <div>
                  <span className="block text-2xl font-bold text-red-700">
                    {q.totalExpense}
                  </span>
                  <span className="text-sm text-red-600">
                    Total Expenditures
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg">
                  <i className="bi bi-plus-slash-minus text-xl" />
                </div>
                <div>
                  <span className="block text-2xl font-bold text-blue-700">
                    {q.netIncome}
                  </span>
                  <span className="text-sm text-blue-600">
                    Net Operating Income
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-600 rounded-lg">
                  <i className="bi bi-wallet2 text-xl" />
                </div>
                <div>
                  <span className="block text-2xl font-bold text-purple-700">
                    {q.fundBalance}
                  </span>
                  <span className="text-sm text-purple-600">
                    Fund Balance (End)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Income Sources */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <i className="bi bi-pie-chart text-primary-600" /> Income
                  Sources
                </h3>
              </div>
              <div className="p-6">
                <div className="h-48 mb-4">
                  <IncomeSourcesChart
                    localValue={q.income.local.value}
                    externalValue={q.income.external.value}
                    totalIncome={q.totalIncomeValue}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-green-500 rounded-full" />
                      <div>
                        <span className="font-medium text-gray-900">
                          Local Sources
                        </span>
                        <span className="block text-xs text-gray-500">
                          Tax & Non-Tax Revenue
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">
                        {q.income.local.amount}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {q.income.local.percentage}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-blue-500 rounded-full" />
                      <div>
                        <span className="font-medium text-gray-900">
                          External Sources
                        </span>
                        <span className="block text-xs text-gray-500">
                          National Tax Allotment
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">
                        {q.income.external.amount}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {q.income.external.percentage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expenditure Allocation */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <i className="bi bi-bar-chart text-primary-600" /> Expenditure
                  Allocation
                </h3>
              </div>
              <div className="p-6">
                <div className="h-48 mb-4">
                  <ExpenditureChart
                    gpsValue={q.expenditure.gps.value}
                    socialValue={q.expenditure.social.value}
                    economicValue={q.expenditure.economic.value}
                    debtValue={q.expenditure.debt.value}
                    totalExpense={q.totalExpenseValue}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-indigo-500 rounded-full" />
                      <div>
                        <span className="font-medium text-gray-900">
                          General Public Services
                        </span>
                        <span className="block text-xs text-gray-500">
                          Administration & Operations
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">
                        {q.expenditure.gps.amount}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {q.expenditure.gps.percentage}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-orange-500 rounded-full" />
                      <div>
                        <span className="font-medium text-gray-900">
                          Social Services
                        </span>
                        <span className="block text-xs text-gray-500">
                          Health, Education, Welfare
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">
                        {q.expenditure.social.amount}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {q.expenditure.social.percentage}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div>
                        <span className="font-medium text-gray-900">
                          Economic Services
                        </span>
                        <span className="block text-xs text-gray-500">
                          Infrastructure & Development
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">
                        {q.expenditure.economic.amount}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {q.expenditure.economic.percentage}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 bg-gray-500 rounded-full" />
                      <div>
                        <span className="font-medium text-gray-900">
                          Debt Service
                        </span>
                        <span className="block text-xs text-gray-500">
                          Interest & Charges
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-900">
                        {q.expenditure.debt.amount}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {q.expenditure.debt.percentage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 flex items-center gap-2">
            <i className="bi bi-info-circle" />
            Source:{' '}
            <a
              href="https://blgf.gov.ph/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              Bureau of Local Government Finance (BLGF)
            </a>{' '}
            — Update with your LGU's actual financial data
          </p>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
              <i className="bi bi-building-gear" /> Public Works
            </span>
            <h2 className="text-2xl font-bold text-gray-900">
              Infrastructure Investments
            </h2>
            <p className="text-gray-500">
              Major development projects serving the community
            </p>
          </div>

          {/* Infrastructure Projects */}
          {budget.infrastructureProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {project.year}
                  </span>
                  <span
                    className={`bg-${project.typeColor}-100 text-${project.typeColor}-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1`}
                  >
                    <i className={`bi ${project.typeIcon}`} /> {project.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <i className="bi bi-geo-alt" />{' '}
                  {project.location.replace('{{fullLocation}}', fullLocation)}
                </p>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    Type of Work
                  </span>
                  <span className="block font-medium text-gray-900">
                    {project.typeOfWork}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    Contractor
                  </span>
                  <span className="block font-medium text-gray-900">
                    {project.contractor}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    Contract Cost
                  </span>
                  <span className="block font-bold text-primary-600 text-lg">
                    {project.contractCost}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DPWH Projects Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
              <i className="bi bi-building" /> National Government Projects
            </span>
            <h2 className="text-2xl font-bold text-gray-900">
              DPWH Infrastructure Projects in {lguName}
            </h2>
            <p className="text-gray-500">
              Implementing Agency: District Engineering Office
            </p>
          </div>

          <div
            id="dpwh-projects-container"
            className="bg-gray-50 border border-gray-200 rounded-xl p-8"
          >
            <p className="text-gray-500 text-center">
              Configure DPWH projects data in public/data/dpwh-projects.json
            </p>
          </div>

          <p className="text-sm text-gray-500 flex items-center gap-2 mt-4">
            <i className="bi bi-info-circle" />
            Source:{' '}
            <a
              href="https://transparency.dpwh.gov.ph/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              DPWH Transparency Portal
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
