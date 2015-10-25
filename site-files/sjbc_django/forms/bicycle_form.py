from django.forms import ModelForm, TextInput
from store.bicycle import Bicycle

class BicycleForm(ModelForm):
	class Meta:
		model = Bicycle
		fields = ['sjbc_id', 'manufacturer', 'model']
		widgets = {
            'sjbc_id': TextInput(attrs={'size': 20}),
            'manufacturer': TextInput(attrs={'size': 20}),
            'model': TextInput(attrs={'size': 20}),
        }
