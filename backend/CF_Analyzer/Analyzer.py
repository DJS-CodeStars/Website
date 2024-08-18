import requests, plotly.graph_objs as go,numpy as np
from flask import Flask, render_template, request, jsonify
from datetime import datetime,timedelta
from operator import itemgetter


class Analyzer:

    def __init__(self,handle):
        self.handle=handle
        self.user_info=requests.get(f'https://codeforces.com/api/user.info?handles={handle}&checkHistoricHandles=false').json()
        
        if self.user_info['status'] != "OK":
            raise Exception("Failed to get User")
        
        self.user_status=requests.get(f'https://codeforces.com/api/user.status?handle={handle}').json()
        
        self.rating_data = requests.get(f' https://codeforces.com/api/user.rating?handle={handle}').json()
     

    def get_info(self):
        info=dict()
        # print(self.user_status)
        tried=len(set([item['problem']['name'] for item in self.user_status['result'] if item['problem'] is not None]))
        info['tried']=tried
        solved=len([item for item in self.user_status['result'] if item['verdict']=='OK'])
        info['solved']=solved
        attempts=float(len(self.user_status['result']))/float(solved)
        info['avg attempts']=float(f'{attempts:.2f}')
        
        info.update(self.user_info['result'][0])
        print(info)

        return info


    def stalk_hardest(self):
        self.sorted_hard=[]
        problems=set()
        if self.user_status['status']=='OK':
            hard=[]
            for items in self.user_status['result']:
                if items['verdict']=='OK' and 'rating' in items['problem'] and items['problem']['name'] not in problems:

                    l1=[items['problem']['rating'],items['problem']['name'],(items['creationTimeSeconds']),items['author']['participantType'],items['relativeTimeSeconds']]
                    problems.add(items['problem']['name'])
                    hard.append(l1)
            
            self.sorted_hard=sorted(hard,key=itemgetter(0,2),reverse=True)
           
            contest_hard=[item for item in self.sorted_hard if item[3]=='CONTESTANT']
            
            fast_solve=dict()
            for items in self.sorted_hard:
                if (items[3]=='CONTESTANT'):
                    if items[0] in fast_solve:
                        fast_solve[items[0]]= fast_solve.get(items[0]) if fast_solve.get(items[0])[1]<timedelta(seconds=items[4]) else [items[1],timedelta(seconds=items[4])]
                    else:
                        fast_solve[items[0]]=[items[1],timedelta(seconds=items[4])]

        return self.sorted_hard[:30],contest_hard[0:20],fast_solve
           

    def rating_timeline(self):
        self.rating_list=[]
        self.date_list=[]
        if self.rating_data['status']=='OK':
            for items in self.rating_data['result']:
                self.rating_list.append(items['newRating'])
                self.date_list.append(datetime.utcfromtimestamp(items['ratingUpdateTimeSeconds']).strftime('%Y-%m-%d %H:%M:%S'))
        return self.rating_list,self.date_list
    

    def perf(self):
        delta=[]
        delta.append(self.rating_list[0]*4)
        for i in range(0,len(self.rating_list)-1):
            delta.append(self.rating_list[i]+(self.rating_list[i+1]-self.rating_list[i])*4)
        
        return delta,self.date_list
    

    def precentile(self):
        self.ranks=requests.get('https://codeforces.com/api/user.ratedList?activeOnly=true&includeRetired=false').json()
        ratings=np.array(sorted(item['rating'] for item in self.rank['result']))
        n = len(ratings)
        perc = 100*np.arange(n)/n
        
        return perc,self.user_info['result']['handle'],self.user_info['result']['rating']

    

def main():
    test=Analyzer('hardikrana439')
    test.get_info()
    
main()
      

