import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const data = [
  { salary: 80000, count: 15 },
  { salary: 90000, count: 25 },
  { salary: 100000, count: 35 },
  { salary: 110000, count: 45 },
  { salary: 120000, count: 40 },
  { salary: 130000, count: 30 },
  { salary: 140000, count: 20 },
  { salary: 150000, count: 10 },
];

export default function SalaryDistribution() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const x = d3.scaleLinear()
      .domain([d3.min(data, d => d.salary)!, d3.max(data, d => d.salary)!])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)!])
      .range([height, 0]);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const area = d3.area<typeof data[0]>()
      .x(d => x(d.salary))
      .y0(height)
      .y1(d => y(d.count))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(data)
      .attr("fill", "#818cf8")
      .attr("d", area);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d => `$${d/1000}k`));

    g.append("g")
      .call(d3.axisLeft(y));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Distribution</h3>
      <svg ref={svgRef} width="100%" height="300" />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Median Salary</p>
          <p className="text-xl font-semibold text-gray-900">$120,000</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Salary Range</p>
          <p className="text-xl font-semibold text-gray-900">$80k - $150k</p>
        </div>
      </div>
    </div>
  );
}